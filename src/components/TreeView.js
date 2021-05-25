import React, {useState, useEffect} from 'react';
import categoryService from '../services/category';
import {swalCategory, swalDeleteCategory, swalError, swalLoading, swalSuccess} from "../utils/swal";
import Swal from "sweetalert2";
import CalendarView from "./CalendarView";
import Header from "./Header";
import Category from "./Category";

function TreeView(props) {

    const [showCategoryDetailsPopup, setShowCategoryDetailsPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        reloadLibs();
    }, []);

    const reloadPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }

    const reloadLibs = () => {
        setTimeout(() => {
            if (document.querySelector(`script[src*="/js/script.js"]`))
                document.querySelector(`script[src*="/js/script.js"]`).remove();

            let js = document.createElement("script");
            js.src = "/js/script.js";
            js.type = "text/javascript";
            document.getElementsByTagName('body')[0].appendChild(js);
        }, 200);
    }

    const handleCreate = (e, currentCategory) => {
        e.preventDefault();

        swalCategory('', currentCategory.label, async label => {
            swalLoading();
            await categoryService.add(label, currentCategory._id)
                .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                swalSuccess('Category added successfully!');
                reloadPage();
            });
        });
    }

    const handleCategoryDetails = (e, currentCategory) => {
        e.preventDefault();
        setSelectedCategory(currentCategory);
        setShowCategoryDetailsPopup(true);
    }

    const handleCreateRoot = e => {
        e.preventDefault();

        swalCategory('', '', label => {
            swalLoading();
            categoryService.add(label, '').then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                swalSuccess('Category added successfully!');
                reloadPage();
            });
        });
    }

    const handleUpdate = (e, currentCategory) => {
        e.preventDefault();

        swalCategory(currentCategory.label, '', async label => {
            swalLoading();
            await categoryService.update(currentCategory._id, label)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    Swal.close();
                    swalSuccess('Category updated successfully!');
                    reloadPage();
                });
        });
    }

    const handleDelete = (e, currentCategory) => {
        swalDeleteCategory(async () => {
            await categoryService.delete(currentCategory._id)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    Swal.close();
                    swalSuccess('Category deleted successfully!');
                    reloadPage();
                });
        });
    }

    const handleSelect = (e, currentCategory) => {
        props.setSelectedCategory(currentCategory);
    }

    const renderTree = arr => {
        return arr.map(node => {
            if (node.children.length > 0) {
                return <li key={node._id}>
                    <a onClick={e => handleSelect(e, node)}><i className="far fa-folder"></i>{node.label}</a>
                    <i className="fa fa-eye" onClick={e => handleCategoryDetails(e, node)} title="View details"></i>
                    <i className="fa fa-plus" onClick={e => handleCreate(e, node)} title="Add sub category"></i>
                    <i className="fa fa-pencil-alt" onClick={e => handleUpdate(e, node)} title="Edit this category"></i>
                    <i className="fa fa-trash" onClick={e => handleDelete(e, node)} title="Delete this category"></i>
                    <ul>
                        {renderTree(node.children)}
                    </ul>
                </li>;
            } else {
                return <li key={node._id}>
                    <a onClick={e => handleSelect(e, node)}>{node.label}</a>
                    <i className="fa fa-eye" onClick={e => handleCategoryDetails(e, node)} title="View details"></i>
                    <i className="fa fa-plus" onClick={e => handleCreate(e, node)} title="Add sub category"></i>
                    <i className="fa fa-pencil-alt" onClick={e => handleUpdate(e, node)} title="Edit this category"></i>
                    <i className="fa fa-trash" onClick={e => handleDelete(e, node)} title="Delete this category"></i>
                </li>
            }
        });
    }

    return (
        <div>
            {selectedCategory && showCategoryDetailsPopup && <Category category={selectedCategory} onClose={() => {setSelectedCategory(null); setShowCategoryDetailsPopup(false);}} />}
            <div className="row">
                <div className="col text-right">
                    <a href="#" onClick={e => handleCreateRoot(e)} className="btn-purple">
                        <i
                            className="fa fa-plus-circle"
                            style={{fontSize: '20px', marginRight: '8px'}}
                        ></i>
                        Create a root category
                    </a>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col">
                    <ul id="treeview" className="jslists">
                        {renderTree(props.data)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TreeView;