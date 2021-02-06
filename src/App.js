import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import TreeView from "./components/TreeView";
import NoCategorySelected from "./components/NoCategorySelected";
import categoryService from "./services/category";
import {swalError} from "./utils/swal";
import Task from "./components/Task";
import taskService from "./services/task";
import moment from "moment";
import _ from "lodash";
import $ from "jquery";

function App() {
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        reloadCategories();
    }, []);

    useEffect(() => {
        if(!selectedCategory) return;
        reloadTasks();
    }, [selectedCategory]);

    const reloadCategories = async () => {
        await categoryService.getAll(``)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }
                setData(result.data);
            });
    }

    const handleCreateTask = e => {
        e.preventDefault();
        setShowTaskModal(true);
    }

    const reloadTasks = async () => {
        await taskService.getAll(selectedCategory._id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setTotalDuration(result.data.duration);

                let f = Array.from(result.data.tasks);
                let groups = _.groupBy(result.data.tasks, obj => moment(obj.start).startOf('day').format());
                for (const [key, value] of Object.entries(groups)) {
                    f.push({
                        title: `Total ${getHoursMinutesFormat(value.reduce((a, b) => a + b.duration, 0))}`,
                        start: moment(key).toDate(),
                        end: moment(key).toDate()
                    });
                }

                f = f.map(x => {
                    return {
                        ...x,
                        start: moment(x.start).toDate(),
                        end: moment(x.end).toDate()
                    };
                });

                setTasks(f);
            });
    }

    const viewTaskDetails = task => {
        setSelectedTask(task);
        setShowTaskModal(true);
    }

    const getHoursMinutesFormat = minutes => moment.utc(moment.duration(minutes*60, "seconds").asMilliseconds()).format("HH:mm");

    return (
        <div>
            <Header />
            {
                showTaskModal &&
                <Task
                    task={selectedTask}
                    selectedCategory={selectedCategory}
                    onClose={() => {setSelectedTask(null);setShowTaskModal(false);}}
                    reloadTasks={reloadTasks} />
            }
            <div className="container-fluid">
                <div className="row mt-10" style={{height: '90vh'}}>
                    <div className="col-3">
                        <TreeView data={data} setSelectedCategory={setSelectedCategory} />
                    </div>
                    <div className="col-9">
                        {selectedCategory &&
                        <div className="row mb-10">
                            <div className="col">
                                <strong>Selected category: </strong>{selectedCategory.label}
                                &nbsp;|&nbsp;
                                <strong>Total duration:</strong> {getHoursMinutesFormat(totalDuration)}
                            </div>
                            <div className="col text-right">
                                <a href="#" onClick={e => handleCreateTask(e)} className="btn-purple">
                                    <i
                                        className="fa fa-plus-circle"
                                        style={{fontSize: '20px', marginRight: '8px'}}
                                    ></i>
                                    Create new Task
                                </a>
                            </div>
                        </div>}
                        {selectedCategory && <CalendarView tasks={tasks} viewTaskDetails={viewTaskDetails} /> || <NoCategorySelected />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
