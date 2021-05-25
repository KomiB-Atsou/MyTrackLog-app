import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import taskService from '../services/task';
import categoryService from '../services/category';
import {swalDeleteForm, swalError, swalInfo, swalSuccess} from "../utils/swal";
import Swal from "sweetalert2";
import SelectSearch, {fuzzySearch} from 'react-select-search';
import 'react-select-search/style.css';

import ReactDOM from 'react-dom'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

function Task(props) {

    const currentDateTime = moment();
    const [label, setLabel] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState({});
    const [startedAt, setStartedAt] = useState(currentDateTime);
    const [finishedAt, setFinishedAt] = useState(currentDateTime);
    const [categories, setCategories] = useState([]);

    const onChange = (currentNode, selectedNodes) => {

        console.log('the value : ', currentNode, selectedNodes);
        //setCategoryId(currentNode.value)
        
      }
      const onAction = (node, action) => {
        console.log('onAction::', action, node)
      }
      const onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
      }

    useEffect(() => {

        categoryService.getAll("")            
            .then(result => {
                console.log('***************************************************');
                if (result.error) {
                    swalError(result.error);
                    return;
                }
               
                /* let temp = result.data;

                temp.forEach(element => {
                
                element.value = element._id;
                }); */
                console.log('resul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datyaresul.datya: ', result.data);
                setCategories(result.data);
                console.log('categoriescategoriescategoriescategoriescategoriescategoriescategoriescategoriescategoriescategoriescategoriescategoriescategoriescategories: ', categories);
                /* if (props.task) {
                    console.log(props.task);
                    setLabel(props.task.title.split('|')[0]);
                    setCategoryId(props.task.categoryId);
                    setDescription(props.task.description);
                    setStartedAt(moment(props.task.start).format("YYYY-MM-DDTHH:mm"));
                    setFinishedAt(moment(props.task.end).format("YYYY-MM-DDTHH:mm"));
                } */
            });

        /* categoryService.getAllFlat("")
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setCategories(result.data);
                if (props.task) {
                    console.log(props.task);
                    setLabel(props.task.title.split('|')[0]);
                    setCategoryId(props.task.categoryId);
                    setDescription(props.task.description);
                    setStartedAt(moment(props.task.start).format("YYYY-MM-DDTHH:mm"));
                    setFinishedAt(moment(props.task.end).format("YYYY-MM-DDTHH:mm"));
                }
            }); */
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const duration = moment.duration(moment(finishedAt).diff(moment(startedAt))).asMinutes();
        if (duration <= 0) {
            swalInfo(`Task duration is not valid.`);
            return;
        }

        if (!props.task) {
            await taskService.add({
                label,
                description,
                startedAt,
                finishedAt,
                duration: duration,
                categoryId
            }).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                swalSuccess('Task added successfully!');
                clear();
                props.reloadTasks();
                props.onClose();
            });
        } else {
            await taskService.update(props.task._id, {
                label,
                description,
                startedAt,
                finishedAt,
                duration: duration,
                categoryId
            }).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                swalSuccess('Task updated successfully!');
                clear();
                props.reloadTasks();
                props.onClose();
            });
        }
    }

    const handleDelete = e => {
        swalDeleteForm(async () => {
            await taskService.delete(props.task._id)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    Swal.close();
                    swalSuccess('Task deleted successfully!');
                    clear();
                    props.reloadTasks();
                    props.onClose();
                });
        });
    }

    const clear = () => {
        setLabel('');
        setDescription('');
        setCategoryId('');
        const currentDateTime = moment().format("YYYY-MM-DDThh:mm");
        setStartedAt(currentDateTime);
        setFinishedAt(currentDateTime);
    }
   

    return (
       
        <Rodal visible={true}
               onClose={() => {
                   clear();
                   props.onClose();
               }}
               closeOnEsc={false}
               closeMaskOnClick={false}
               customStyles={{width: '50%', height: '70%', overflow: 'auto'}}>
            <div className="container-fluid text-center">
                <form onSubmit={handleSubmit}>
                    <h4 className="m-4">{props.task && 'Update Task' || 'Create Task'}</h4>
                    {/*<div className="row">*/}
                    {/*    <div className="col text-left">*/}
                    {/*        <label><i>You are {props.task && 'updating' || 'adding'} this Task*/}
                    {/*            in <strong>{props.selectedCategory.label} </strong>category.</i></label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtLabel">Task label</label>
                                <input type="text" className="form-control"
                                       placeholder="Label or Title..." required="required"
                                       id="txtLabel"
                                       value={label} onChange={e => setLabel(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtLabel">Category</label>
                                <DropdownTreeSelect data={categories} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} 
                                keepTreeOnSearch={true} mode="radioSelect" keepOpenOnSelect={true}/>

                                {/* <SelectSearch
                                    value={categoryId}
                                    onChange={setCategoryId}
                                    emptyMessage="Not found"
                                    placeholder="Select category"
                                    search
                                    filterOptions={fuzzySearch}
                                    options={categories}
                                    style={{width: '100%'}}
                                /> */}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtDescription">Description</label>
                                <textarea className="form-control"
                                          placeholder="Description..." required="required"
                                          id="txtDescription"
                                          value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    {
                        props.task &&
                        <div className="row">
                            <div className="col text-left">
                                <label><i>
                                    Task duration is <strong>{moment.duration(moment(props.task.end).diff(moment(props.task.start))).asMinutes()}</strong> minutes.</i></label>
                            </div>
                        </div>
                    }
                    {
                        !props.task &&
                        <div className="row">
                            <div className="col text-left">
                                <label><i>
                                    Task duration is <strong>{moment.duration(moment(finishedAt).diff(moment(startedAt))).asMinutes()}</strong> minutes.</i></label>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtStart">Starting at</label>
                                <input type="datetime-local" className="form-control"
                                       value={startedAt} onChange={e => setStartedAt(e.target.value)}/>
                            </div>
                        </div>
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtStart">Finished at</label>
                                <input type="datetime-local" className="form-control"
                                       value={finishedAt} onChange={e => setFinishedAt(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button
                                type="button"
                                className="btn btn-secondary m-1"
                                onClick={props.onClose}>Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary m-1"
                                onClick={handleSubmit}>Submit
                            </button>
                            {
                                props.task &&
                                <button
                                    type="button"
                                    className="btn btn-danger m-1"
                                    onClick={handleDelete}>Delete
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </Rodal>
    );
}

export default Task;