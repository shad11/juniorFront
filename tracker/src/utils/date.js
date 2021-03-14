import dayjs from "dayjs";

export const formatPeriod = period => {
    const curr = Date.now();

    const dateStart = dayjs(curr);
    let dateEnd = dayjs(curr + period);

    const hh = dateEnd.diff(dateStart, 'hour');
    dateEnd = dateEnd.add(-hh, 'h');

    const mm = dateEnd.diff(dateStart, 'm');
    dateEnd = dateEnd.add(-mm, 'm');

    const ss = dateEnd.diff(dateStart, 's');

    return `${hh}:${mm}:${ss}`; 
};