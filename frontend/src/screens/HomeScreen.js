import React, { useEffect, useState } from 'react';
// import data from '../data';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SelectBox from '../components/SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import { listImages } from '../actions/loadSetAction.js';
import { completeSet } from '../actions/completeSetActions';

function HomeScreen() {
    const dispatch = useDispatch();
    const imageList = useSelector(state => state.imageList);
    const { loading, error, images,
        numberOfSetLeft, numberOfImagesLeft,
        numberOfImagesInCurrentSet, currentSetNumber } = imageList;

    useEffect(() => {
        dispatch(listImages());
    }, [dispatch]);

    const [values, setValues] = useState({});
    const [values_img, setValuesImg] = useState({});

    const [pending_images, setPendingImages] = useState(Object.keys(values).length);
    const [submitError, setSubmitError] = useState(false);
    const [displaySelection, setDisplaySelection] = useState(false);

    const handleFieldChange = (fieldId, value, name) => {
        setValues({ ...values, [fieldId]: value });
        setValuesImg({ ...values_img, [name]: value });
    };
    useEffect(() => {
        var count = 0;
        var i;
        for (i in values) {
            if (values[i] !== "select") {
                count++;
            }
        }
        setPendingImages(numberOfImagesInCurrentSet - count);
        setSubmitError(false);
        setDisplaySelection(false);
        //console.log(values);
    }, [values, numberOfImagesInCurrentSet]);
    const doneHandler = (e) => {
        e.preventDefault();
        if (pending_images !== 0) {
            setSubmitError(true);
            return;
        }
        else {
            setDisplaySelection(true);
            return;
        }
    };
    const confirmHandler = (e) => {
        e.preventDefault();
        dispatch(completeSet(currentSetNumber, values));
        setValues({});
        setValuesImg({});
    };
    const loadBaseImage = images => {
        let content = [];
        for (let l = 0; l < numberOfImagesInCurrentSet; l++) {
            for (let i = 0; i < images.length; i++) {
                const img_set = images[i];
                if (img_set.isBaseImg) {
                    content.push(<div key={`${img_set._id}_${l}`} className="card">
                        <img className="medium" src={img_set.image} alt={img_set.name} />
                        <div className="card-body">
                            <h5>Match Me</h5>
                        </div>
                    </div>);
                }
            }
        }
        return content;
    };
    const displayResult = values_img => {
        let content = [];
        for (let value in values_img) {
            content.push(<li key={value}>{value}{` : `}{values_img[value]}</li>);
        }
        return content;
    }
    return (
        <div>
            { loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <div>
                            <div className="row top">
                                <div className="col-1">
                                    <h2>Task Remaining :{numberOfSetLeft} </h2>
                                    <h2>   Total Images Remaining:{numberOfImagesLeft}</h2>
                                    <h2>Images in current Set :{numberOfImagesInCurrentSet}</h2>
                                    <h2>Pending Images in current Set :{pending_images}</h2>

                                </div>
                                <div className="col-1">
                                    {
                                        loadBaseImage(images)
                                    }
                                </div>
                                <div className="col-1">
                                    {
                                        images.filter(img_set => !img_set.isBaseImg).map(img_set => (
                                            <div key={img_set._id} className="card">
                                                <img className="medium" src={img_set.image} alt={img_set.name} />
                                                <div className="card-body">
                                                </div>
                                                <SelectBox
                                                    key={img_set._id}
                                                    id={img_set._id}
                                                    onChange={handleFieldChange}
                                                    value={values[img_set.result]}
                                                    img_set={img_set}></SelectBox>
                                            </div>
                                        ))

                                    }
                                </div>
                                <div className="col-1">
                                    {submitError ? <MessageBox variant="danger">Complete all images before submit</MessageBox> : null}
                                    <label />
                                    <button className="primary" onClick={doneHandler}>
                                        Done
                                </button>
                                    {displaySelection
                                        ? (<div>
                                            <h2>You have selected below options :</h2>
                                            <ul>
                                                {displayResult(values_img)}
                                            </ul>
                                            <button className="primary" onClick={confirmHandler}>
                                                Confirm
                                                        </button>
                                        </div>)
                                        : null}
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default HomeScreen
