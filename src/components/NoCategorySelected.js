import React from 'react';

function NoCategorySelected(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <p className="not-selected"><i className="fa fa-exclamation m-3"></i>Category not selected</p>
                    <p className="not-selected-hint"><i className="fa fa-quote-left m-2"></i>Please select a category to load its Tasks Calendar.<i className="fa fa-quote-right m-2"></i></p>
                </div>
            </div>
        </div>
    );
}

export default NoCategorySelected;