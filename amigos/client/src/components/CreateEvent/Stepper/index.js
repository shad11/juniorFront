import React from "react";
import styles from "./Stepper.module.scss";

const Stepper = ({ steps, active }) => {
    return (
        <div className={styles.steps}>
            {steps.map((step, i) => (
                <div
                    className={i === active ? `${styles.eventStep} ${styles['eventStep--active']}` : styles.eventStep}
                    key={`stepper-${i}`}
                >
                    {i !== 0 && (
                        <div className={i === 2 ? `${styles.line} ${styles['line--spec']}` : styles.line }>
                            <span />
                        </div>
                    )}
                    <span className={styles.content}>
                        <span>
                            <i className={`${step.iconClass}`}/>
                        </span>
                        <span className={styles.text}>
                            <span>{step.title}</span>
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Stepper;