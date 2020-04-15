import React from 'react';

export const displayDate = (dateString?: Date) => {
    if (dateString) {
        const date = new Date(dateString);
        return (
            <>
                {date.getDate()}.{date.getMonth()}.{date.getFullYear()} - {date.getUTCHours()}:{date.getUTCMinutes()}
            </>
        );
    } else {
        return <> unknown</>;
    }
};
