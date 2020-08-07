import React from 'react';

const Action = (props) => {
    const { handlePick, hasOptions } = props;
    return (
        <React.Fragment>
            <button
                className="big-button" 
                onClick={handlePick}
                disabled={!hasOptions}
            >
                What should I do?
            </button>
        </React.Fragment>
    );
}

export default Action;