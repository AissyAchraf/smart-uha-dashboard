import React, { useEffect, useState, useRef } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Stepper = ({ steps, currentStep }) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

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
                        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 py-3 flex justify-center items-center 
                            ${step.completed ? "bg-green-600 text-white font-bold border border-green-600" : ""} ${step.highlighted ? "font-bold border border-green-600" : ""}
                        `}>
                            {step.completed ? (
                                <CheckOutlinedIcon  className="text-white font-bold text-xl" />
                            ) : step.icon}
                        </div>
                        <div className={`absolute top-0 text-center mt-14 w-32 text-xs font-medium 
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

    // const displaySteps = (
    //     <div className="w-full flex items-center">
    //         <div className="relative flex flex-col items-center text-teal-600">
    //             <div
    //                 className="rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 py-3 flex justify-center items-center">
    //                 1
    //             </div>
    //             <div className="absolute top-0 text-center mt-16 w-32 text-xs font-medium">
    //                 Description
    //             </div>
    //         </div>
    //         <div className="flex-auto border-t-2 transition duration-500 ease-in-out">
    //         </div>
    //     </div>
    // );

    return (
        <div className="mx-4 p-4 flex justify-between items-center">
            {displaySteps}
        </div>
    )
}
export default Stepper;