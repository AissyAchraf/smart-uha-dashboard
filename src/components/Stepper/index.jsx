import React, { useEffect, useState, useRef } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useMediaQuery } from '@mui/material';

const Stepper = ({ steps, currentStep }) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps];
        let count = 0;

        while (count < newSteps.length) {
            // current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    completed: false,
                    highlighted: true,
                    selected: true,
                }
            }
            // step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    completed: true,
                    highlighted: true,
                    selected: true,
                }
                // count++;
            }
            // step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    completed: false,
                    highlighted: false,
                    selected: false,
                }
                // count++;
            }
            count++;
        }
        return newSteps;
    };

    useEffect(() => {
        // Steps state
        const stepsState = steps.map((step, i) => {
            return Object.assign({}, {
                description: step.description,
                icon: step.icon,
                completed: false,
                highlighted: i === 0 ? true : false,
                selected: i === 0 ? true : false,
            });
        });
        console.log(stepsState);
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);
    }, [steps, currentStep]);

    const displaySteps = newStep.map((step, i) => {
        return (
            <div key={i} className={i !== newStep.length - 1 ? "w-full flex items-center" : "flex items-center" }>
                <div className="w-full flex items-center">
                    <div className={`relative flex flex-col items-center ${step.highlighted ? "text-teal-600" : "text-gray-400"}`}>
                        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 lg:h-12 lg:w-12 h-7 w-7 lg:py-3 py-1 flex justify-center items-center 
                            ${step.completed ? "bg-green-600 text-white font-bold border border-green-600" : ""} ${step.highlighted ? "font-bold border border-green-600" : ""}
                        `}>
                            {step.completed ? (
                                <CheckOutlinedIcon  className="text-white" fontSize={isSmallScreen ? "small" : "medium"}/>
                            ) : step.icon}
                        </div>
                        <div className={`absolute lg:top-0 text-center lg:mt-14 lg:w-32 mt-9 text-xs lg:font-medium 
                            ${step.highlighted ? "text-green-600" : "text-gray-400"}    
                        `}>
                            {step.description}
                        </div>
                    </div>
                    <div className={`flex-auto border-t-2 transition duration-500 ease-in-out
                        ${step.completed ? "border-green-600" : "border-gray-400"}
                    `}>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="mx-4 p-4 flex justify-between items-center">
            {displaySteps}
        </div>
    )
}
export default Stepper;