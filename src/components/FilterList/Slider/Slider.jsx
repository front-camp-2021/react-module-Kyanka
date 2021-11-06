import React, {useCallback, useEffect, useRef} from "react";
import "./Slider.css";
import classNames from "classnames";
import {changePage} from "../../../redux/pagesReducer";
import {changeRange} from "../../../redux/filtersReducer";
import {useDispatch, useSelector} from "react-redux";


const Slider = () => {
    const {rangeStart, range} = useSelector((state) => state.filtersRed)
    const {min, max} = rangeStart;
    const minVal = range.min;
    const maxVal = range.max;

    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const rangeRef = useRef(null);
    const dispatch = useDispatch();

    const getPercent = useCallback((value) => {
        return Math.round(((value - min) / (max - min)) * 100);
    }, [min, max]);

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);
            if (rangeRef.current) {
                rangeRef.current.style.left = `${minPercent}%`;
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);
            if (rangeRef.current) {
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    const changeMin = (min) => {
        dispatch(changePage(1));
        dispatch(changeRange({min: min, max: maxVal}))
    }

    const changeMax = (max) => {
        dispatch(changePage(1));
        dispatch(changeRange({min: minVal, max: max}))
    }

    return (
        <div className="container">
            <div className="slider__left-value">{minVal}</div>
            <div className="slider">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        changeMin(value);
                        event.target.value = value.toString();
                    }}
                    className={classNames("thumb thumb--zindex-3", {
                        "thumb--zindex-5": minVal > max - 100
                    })}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        changeMax(value);
                        event.target.value = value.toString();
                    }}
                    className="thumb thumb--zindex-4"
                />
                <div className="slider__track">
                </div>
                <div ref={rangeRef} className="slider__range"/>
            </div>
            <div className="slider__right-value">{maxVal}</div>
        </div>
    );
};

export default Slider


