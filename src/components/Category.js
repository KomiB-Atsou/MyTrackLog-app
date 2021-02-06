import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import taskService from '../services/task';
import categoryService from '../services/category';
import {swalDeleteForm, swalError, swalInfo, swalSuccess} from "../utils/swal";
import Swal from "sweetalert2";

function Category(props) {

    const [path, setPath] = useState('');

    useEffect(() => {
        categoryService.getPath(props.category._id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                setPath(result.data.path);
            });
    }, []);

    return (
        <Rodal visible={true}
               onClose={() => {
                   props.onClose();
               }}
               closeOnEsc={false}
               closeMaskOnClick={false}
               customStyles={{width: '50%', height: '70%', overflow: 'auto'}}>
            <div className="container-fluid text-center">
                <h4 className="m-4">Category Details</h4>
                <div className="row">
                    <div className="col text-left">
                        <p><strong>Label: </strong> {props.category.label}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-left">
                        <p><strong>Creation date: </strong> {moment(props.category.dateCreated).format("YYYY-MM-DD HH:mm")}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-left">
                        <p><strong>Last updated: </strong> {moment(props.category.dateUpdated).format("YYYY-MM-DD HH:mm")}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-left">
                        <p><strong>Path: </strong> {path}</p>
                    </div>
                </div>
            </div>
        </Rodal>
    );
}

export default Category;