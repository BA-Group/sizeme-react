import React from "react";
import PropTypes from "prop-types";
import { translate, Interpolate } from "react-i18next";
import "./SizeSlider.scss";
import ProductModel, { fitRanges } from "../api/ProductModel";

const FitIndicator = (props) => {
    const left = `calc(${props.value}% - 8px`;
    return (
        <svg className="indicator" style={{ left }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <polygon className={props.fitRange.label} points="5,0 10,10 0,10 5,0" />
        </svg>
    );
};

FitIndicator.propTypes = {
    value: PropTypes.number.isRequired,
    fitRange: PropTypes.object.isRequired
};

const RecommendationIndicator = (props) => {
    const left = `calc(${props.value}% - 8px`;
    return (
        <svg className="recommendation" style={{ left }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path d="M5 0 L10 10 L0 10 Z M5 2.2 L8.4 9.1 L1.6 9.1 Z" />
        </svg>
    );
};

RecommendationIndicator.propTypes = {
    value: PropTypes.number.isRequired
};

class SizeSlider extends React.Component {

    constructor (props) {
        super(props);
        this.sliderPosXMin = fitRanges[0].start;
        this.sliderPosXMax = fitRanges.slice(-1)[0].end;
        this.sliderScale = 100 / (this.sliderPosXMax - this.sliderPosXMin);
    }

    componentDidMount () {
        this.calculatePlaceholderSize();
    }

    componentDidUpdate () {
        this.calculatePlaceholderSize();
    }

    calculatePlaceholderSize () {
        if (!this.doShowFit() && this.placeholder) {
            const containerWidth = this.placeholder.parentNode.offsetWidth - 10;
            this.placeholder.style.transform = "scale(1)";
            const placeholderWidth = this.placeholder.offsetWidth;
            this.placeholder.style.transform = `scale(${containerWidth / placeholderWidth})`;
        }
    }

    doShowFit () {
        return this.props.match && this.props.match.matchMap && this.props.match.accuracy > 0;
    }

    getFitPosition (value) {
        return Math.max(0,
            (Math.min(value, this.sliderPosXMax) - this.sliderPosXMin) * this.sliderScale);
    }

    getFitRange () {
        return ProductModel.getFit({ componentFit: this.props.match.totalFit, importance: 1 }, true);
    }

    render () {
        const doShowFit = this.doShowFit();
        return (
            <div className={`sizeme-slider${doShowFit ? "" : " no-fit"}`}>
                <div className="slider-placeholder">
                    <span ref={ref => { this.placeholder = ref; }}>
                        Enter your measurements to find the right size.
                    </span>
                </div>
                {fitRanges.map(fit => (
                    <div className={fit.label + " fit-area"} key={fit.label}>
                        <Interpolate i18nKey={`fitVerdict.${fit.label}`}/>
                    </div>
                ))}
                {doShowFit && <FitIndicator value={this.getFitPosition(this.props.match.totalFit)}
                                                   fitRange={this.getFitRange()}/>}
                {doShowFit && this.props.recommendedMatch && <RecommendationIndicator
                    value={this.getFitPosition(this.props.recommendedMatch.totalFit)}/>}
            </div>
        );
    }
}

SizeSlider.propTypes = {
    match: PropTypes.object,
    recommendedMatch: PropTypes.object
};

export default translate()(SizeSlider);
