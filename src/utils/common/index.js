export const getCurrentHour = () => {
    const dateString = new Date();
    return dateString.getHours();
}

export const getShowAiringTime = (time) => {
    const HR24 = time.split(":")[0];
    return parseInt(HR24);
}

export const getScheduleRange = (timeCode) => {
    if(timeCode) {
        return `${timeCode===0 ? 12 : timeCode}:00 Hr - ${timeCode===0 ? 13 : timeCode+1}:00 Hr`;
    }
    else {
        return "00:00 Hr - 01:00 Hr";
    }        
}

export const runningStatusOfShow = (startDate, endDate) => {
    const startYear = startDate?.split("-")[0];

    if(endDate) {
        const endYear = endDate?.split("-")[0];
        return `${startYear} - ${endYear}`;
    }
    else {
        return `${startYear} - Present`;
    }
}

export const showAiringDays = (days, time) => {
    return `Every ${days.join(" , ")} at ${time}HR`;
}

export const getTimeRanges = () => {
    const timeRanges = [];
    for(let i=0;i<24;i++) {
        const HR24 = (i===0 ? "0" : i);
        const HR12 = (i===0 ? 12 : (i>12 ? i-12 : i));
        timeRanges.push({
            code: i,
            value: `${HR24>=10 ? HR24 : "0"+HR24}:00 Hr - ${HR24==="0" ? "01":HR24>=9 ? HR24+1 : "0"+(HR24+1)}:00 Hr (${HR12}:00 ${i>=12 ? "PM" : "AM"} - ${HR12+1===13 ? 1 : HR12+1}:00 ${(i+1>=12 && !(i+1===24)) ? "PM" : "AM"})`
        })
    }
    return timeRanges;
}

export const removeDuplicates = (arrayObj) => {
	const jsonObject = arrayObj.map(JSON.stringify);
	const uniqueSet = new Set(jsonObject);
	const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArray;
}