import React, {useState} from "react";
import moment from "moment";
import {
    IconButton,
    Grid,
    makeStyles,
    Card,
    Button,
    CircularProgress,
    Popover,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {ArrowLeft, ArrowRight} from "@material-ui/icons";

const dateFormat = 'DD/MM/YYYY';
const CalendarTemplate = ({
                              availability,
                              setAvailability,
                              primaryColor = "#DF1B1B",
                              secondaryColor = "#47b2a2",
                              fontFamily = "Roboto",
                              fontSize = 12,
                              primaryFontColor = "#222222",
                              startTime = "8:00",
                              endTime = "20:00",
                              saveButtonText = 'Save Availability',
                              selectedMultipleButtonText = 'Add Selected Times to Multiple Days',
                              doneText = 'Done',
                              currentMonthText = 'Jump to Current Month',
                              locale = 'it'
                          }) => {
    const theme = createMuiTheme({
        typography: {
            fontFamily: `${fontFamily}`,
            fontSize: fontSize,
        },
        palette: {
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
            text: {
                primary: primaryFontColor,
            },
        },
    });

    const useStyles = makeStyles((theme) => ({
        calendar: {
            fontFamily: theme.typography.fontFamily,
        },
        calendarText: {
            margin: 0,
            width: 25,
            height: 25,
            textAlign: "center",
        },
        button: {
            minWidth: 200,
            margin: 10,
            fontFamily: theme.typography.fontFamily,
        },
        buttonNoMargin: {
            minWidth: 200,
            fontFamily: theme.typography.fontFamily,
        },
        popover: {
            pointerEvents: "none",
            fontFamily: theme.typography.fontFamily,
        },
        paper: {
            padding: theme.spacing(1),
        },
    }));

    const useMonths = (year) => ({
        1: {
            lastDay: 31,
            month: locale === 'it' ? 'Gennaio' : "January",
            firstDay: moment(`01/01/${year}`, dateFormat)
        },
        2: {
            lastDay: year % 4 === 0 ? 29 : 28,
            month: locale === 'it' ? 'febbraio' : "February",
            firstDay: moment(`01/02/${year}`, dateFormat)
        },
        3: {
            lastDay: 31,
            month: locale === 'it' ? 'marzo' : "March",
            firstDay: moment(`01/03/${year}`, dateFormat)
        },
        4: {
            lastDay: 30,
            month: locale === 'it' ? 'aprile' : "April",
            firstDay: moment(`01/04/${year}`, dateFormat)
        },
        5: {
            lastDay: 31,
            month: locale === 'it' ? 'Maggio' : "May",
            firstDay: moment(`01/05/${year}`, dateFormat)
        },
        6: {
            lastDay: 30,
            month: locale === 'it' ? 'Giugno' : "June",
            firstDay: moment(`01/06/${year}`, dateFormat)
        },
        7: {
            lastDay: 31,
            month: locale === 'it' ? 'Luglio' : "July",
            firstDay: moment(`01/07/${year}`, dateFormat)
        },
        8: {
            lastDay: 31,
            month: locale === 'it' ? 'agosto' : "August",
            firstDay: moment(`01/08/${year}`, dateFormat)
        },
        9: {
            lastDay: 30,
            month: locale === 'it' ? 'settembre' : "September",
            firstDay: moment(`01/09/${year}`, dateFormat)
        },
        10: {
            lastDay: 31,
            month: locale === 'it' ? 'ottobre' : "October",
            firstDay: moment(`01/10/${year}`, dateFormat)
        },
        11: {
            lastDay: 30,
            month: locale === 'it' ? 'novembre' : "November",
            firstDay: moment(`01/11/${year}`, dateFormat)
        },
        12: {
            lastDay: 31,
            month: locale === 'it' ? 'Dicembre' : "December",
            firstDay: moment(`01/12/${year}`, dateFormat)
        },
    });

    const getDefaultTimes = () => {
        const times = [
            {
                time: "0:00",
                available: false,
            },
            {
                time: "1:00",
                available: false,
            },
            {
                time: "2:00",
                available: false,
            },
            {
                time: "3:00",
                available: false,
            },
            {
                time: "4:00",
                available: false,
            },
            {
                time: "5:00",
                available: false,
            },
            {
                time: "6:00",
                available: false,
            },
            {
                time: "7:00",
                available: false,
            },
            {
                time: "8:00",
                available: false,
            },
            {
                time: "9:00",
                available: false,
            },
            {
                time: "10:00",
                available: false,
            },
            {
                time: "11:00",
                available: false,
            },
            {
                time: "12:00",
                available: false,
            },
            {
                time: "13:00",
                available: false,
            },
            {
                time: "14:00",
                available: false,
            },
            {
                time: "15:00",
                available: false,
            },
            {
                time: "16:00",
                available: false,
            },
            {
                time: "17:00",
                available: false,
            },
            {
                time: "18:00",
                available: false,
            },
            {
                time: "19:00",
                available: false,
            },
            {
                time: "20:00",
                available: false,
            },
            {
                time: "21:00",
                available: false,
            },
            {
                time: "22:00",
                available: false,
            },
            {
                time: "23:00",
                available: false,
            },
            {
                time: "0:00",
                available: false,
            },
        ];
        let include = false;
        return times.filter(time => {
            if (time.time === startTime) {
                include = true;
            }
            if (time.time === endTime) {
                include = false;
                return true;
            }
            return include;
        })
    };

    function TimeButton({className, start, end, available, handleClick}) {
        return (
            <Button
                onClick={handleClick}
                color={available ? "primary" : "default"}
                className={className}
                variant={available ? "contained" : "outlined"}
            >
                {start} - {end}
            </Button>
        );
    }

    function getDaysArray() {
        return [
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
        ];
    }

    const convertAvailabilityFromDatabase = (availability) => {
        const output = {};
        for (let range of availability) {
            let start = moment(range.start);
            let startTime = `${start.format("H")}:${start.format("mm")}`;
            let end = moment(range.end);
            let endTime = `${end.format("H")}:${end.format("mm")}`;
            let year = Number(start.format("YYYY"));
            let month = start.format("MMMM");
            let day = Number(start.format("D"));
            fillOutputWithDefaultTimes(output, year, month, day);
            let i = 0;
            while (
                i < output[year][month][day].length &&
                output[year][month][day][i].time !== startTime
                )
                i++;
            while (
                i < output[year][month][day].length &&
                output[year][month][day][i].time !== endTime
                ) {
                output[year][month][day][i].available = true;
                i++;
            }
        }
        return output;
    };

    const convertAvailabilityForDatabase = (availability) => {
        const output = [];
        for (let year in availability) {
            for (let month in availability[year]) {
                for (let day in availability[year][month]) {
                    let activeDay = availability[year][month][day];
                    addActiveDayToOutput(activeDay, output, month, day, year);
                }
            }
        }
        return output;
    };

    const combineTimeArrays = (a, b) => {
        for (let i = 0; i < a.length; i++) {
            a[i].available = a[i].available || b[i].available;
        }
        return a;
    };

    function addActiveDayToOutput(activeDay, output, month, day, year) {
        let activeRangeStart = null;
        for (let time of activeDay) {
            if (time.available && !activeRangeStart) activeRangeStart = time.time;
            else if (!time.available && activeRangeStart) {
                output.push({
                    start: new Date(`${month} ${day} ${year} ${activeRangeStart}`),
                    end: new Date(`${month} ${day} ${year} ${time.time}`),
                });
                activeRangeStart = null;
            }
        }
    }

    function fillOutputWithDefaultTimes(output, year, month, day) {
        if (output.hasOwnProperty(year)) {
            if (output[year].hasOwnProperty(month)) {
                if (!output[year][month].hasOwnProperty(day)) {
                    output[year][month][day] = getDefaultTimes();
                }
            } else {
                output[year][month] = {
                    [day]: getDefaultTimes(),
                };
            }
        } else {
            output[year] = {
                [month]: {
                    [day]: getDefaultTimes(),
                },
            };
        }
    }

    function makeQuickAvailability(availability) {
        const output = {};
        for (let range of availability) {
            if (new Date(range.start) > new Date()) {
                let day = moment(range.start).format("MMMM D, YYYY");
                let time = `${moment(range.start).format("H:mm")} - ${moment(
                    range.end
                ).format("H:mm")}`;
                if (output[day]) {
                    output[day].push(time);
                } else {
                    output[day] = [time];
                }
            }
        }
        return output;
    }

    return function Calendar() {
        const classes = useStyles();
        const today = moment();
        const [availabilityState, setAvailabilityState] = useState(
            convertAvailabilityFromDatabase(availability)
        );
        const [quickAvailability, setQuickAvailability] = useState(
            makeQuickAvailability(availability)
        );
        const [activeDay, setActiveDay] = useState(null);
        const [year, setYear] = useState(Number(today.format("YYYY")));
        const [monthNumber, setMonthNumber] = useState(Number(today.format("M")));
        const [settingMultiple, setSettingMultiple] = useState(false);
        const months = useMonths(year);
        const {firstDay, month, lastDay} = months[monthNumber];
        let dayOfWeek = Number(moment(firstDay).format("d"));
        const days = getDaysArray();
        const [times, setTimes] = useState(getDefaultTimes());
        const [saving, setSaving] = useState(false);
        let week = 0;
        let dayOfMonth = 1;
        while (week < 6 && dayOfMonth <= lastDay) {
            days[week][dayOfWeek] = dayOfMonth;
            dayOfMonth++;
            dayOfWeek++;
            if (dayOfWeek === 7) {
                week++;
                dayOfWeek = 0;
            }
        }
        const createArrowHandler = (delta) => () => {
            let newMonth = monthNumber + delta;
            if (newMonth > 12) {
                setYear(year + 1);
                newMonth = 1;
            } else if (newMonth < 1) {
                setYear(year - 1);
                newMonth = 12;
            }
            setActiveDay(null);
            setTimes(getDefaultTimes());
            setMonthNumber(newMonth);
        };
        const createTimeHandler = (i) => () => {
            const newTimes = [...times];
            newTimes[i].available = !newTimes[i].available;
            if (activeDay) {
                addTimeToDay(newTimes);
            }
            setTimes(newTimes);
        };
        const createDayHandler = (day) => () => {
            if (settingMultiple) {
                addTimesToDay(day);
            } else {
                examineAvailabilityForDay(day);
            }
        };
        const handleSetMultiple = () => {
            setActiveDay(null);
            setSettingMultiple(!settingMultiple);
        };
        const handleSaveAvailability = () => {
            const data = convertAvailabilityForDatabase(availabilityState);
            setSaving(true);
            setAvailability(data);
        };
        const handleJumpToCurrent = () => {
            setYear(Number(today.format("YYYY")));
            setMonthNumber(Number(today.format("M")));
            setActiveDay(null);
            setTimes(getDefaultTimes());
        };
        const [anchorEl, setAnchorEl] = useState(null);
        const [popoverContent, setPopoverContent] = useState(null);
        const handleOpenPopover = (date) => {
            return (e) => {
                if (quickAvailability[date]) {
                    setPopoverContent(
                        quickAvailability[date].map((time, index) => <p key={`time-${time}-${index}`}>{time}</p>)
                    );
                    setAnchorEl(e.target);
                }
            };
        };
        const handleClosePopover = () => {
            setAnchorEl(null);
            setPopoverContent(null);
        };
        return (
            <ThemeProvider theme={theme}>
                <Grid
                    className={classes.calendar}
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item>
                                <IconButton
                                    disabled={
                                        year === Number(today.format("YYYY")) &&
                                        month === today.format("MMMM")
                                    }
                                    onClick={createArrowHandler(-1)}
                                >
                                    <ArrowLeft/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Card style={{padding: 10, margin: 10}} variant="outlined">
                                    <Grid container direction="column" alignItems="center">
                                        <h3>
                                            {month} {year}
                                        </h3>
                                        {days.map((week, i) => (
                                            <Grid key={`day-${week}-${i}`} item>
                                                <Grid container direction="row">
                                                    {week.map((day, i) => (
                                                        <Grid key={year + month + i} item>
                                                            <IconButton
                                                                onClick={createDayHandler(day)}
                                                                color={
                                                                    activeDay === day
                                                                        ? "primary"
                                                                        : availabilityState[year] &&
                                                                        availabilityState[year][month] &&
                                                                        availabilityState[year][month][day] &&
                                                                        availabilityState[year][month][
                                                                            day
                                                                            ].filter((x) => x.available).length > 0
                                                                        ? "secondary"
                                                                        : "default"
                                                                }
                                                                disabled={
                                                                    !day ||
                                                                    (year === Number(today.format("YYYY")) &&
                                                                        month === today.format("MMMM") &&
                                                                        day < Number(today.format("D")))
                                                                }
                                                                size="medium"
                                                                onMouseEnter={handleOpenPopover(
                                                                    `${month} ${day}, ${year}`
                                                                )}
                                                                onMouseLeave={handleClosePopover}
                                                            >
                                                                <p className={classes.calendarText}>{day}</p>
                                                            </IconButton>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        ))}
                                        <Popover
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                            className={classes.popover}
                                            classes={{paper: classes.paper}}
                                            anchorEl={anchorEl}
                                            open={!!anchorEl}
                                        >
                                            {popoverContent}
                                        </Popover>
                                        <Button
                                            disabled={
                                                year === Number(today.format("YYYY")) &&
                                                month === today.format("MMMM")
                                            }
                                            onClick={handleJumpToCurrent}
                                            className={classes.buttonNoMargin}
                                        >
                                            {currentMonthText}
                                        </Button>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={createArrowHandler(1)}>
                                    <ArrowRight/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent="center" alignItems="center" wrap="wrap">
                                    <Grid item>
                                        <Grid
                                            container
                                            direction="column"
                                            alignItems="center"
                                            wrap="wrap"
                                        >
                                            {times.map(
                                                (time, i) =>
                                                    i < times.length - 7 && (
                                                        <TimeButton
                                                            key={`${time.time}-${i}`}
                                                            className={classes.button}
                                                            start={time.time}
                                                            end={times[i + 1].time}
                                                            handleClick={createTimeHandler(i)}
                                                            available={time.available}
                                                        />
                                                    )
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid
                                            container
                                            direction="column"
                                            alignItems="center"
                                            wrap="wrap"
                                        >
                                            {times.map(
                                                (time, i) =>
                                                    i < times.length - 1 &&
                                                    i > 5 && (
                                                        <TimeButton
                                                            key={`${time.time}-${i}`}
                                                            className={classes.button}
                                                            start={time.time}
                                                            end={times[i + 1].time}
                                                            handleClick={createTimeHandler(i)}
                                                            available={time.available}
                                                        />
                                                    )
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSetMultiple}
                                    className={classes.button}
                                >
                                    {settingMultiple
                                        ? doneText
                                        : selectedMultipleButtonText}
                                </Button>
                            </Grid>
                            <Grid item>
                                {saving ? (
                                    <CircularProgress/>
                                ) : (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSaveAvailability}
                                        className={classes.button}
                                    >
                                        {saveButtonText}
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );

        function addTimeToDay(newTimes) {
            const newAvail = availabilityState;
            if (newAvail.hasOwnProperty(year)) {
                if (newAvail[year].hasOwnProperty(month)) {
                    newAvail[year][month][activeDay] = newTimes;
                } else {
                    newAvail[year][month] = {
                        [activeDay]: newTimes,
                    };
                }
            } else {
                newAvail[year] = {
                    [month]: {
                        [activeDay]: newTimes,
                    },
                };
            }
            setAvailabilityState(newAvail);
            setQuickAvailability(
                makeQuickAvailability(convertAvailabilityForDatabase(newAvail))
            );
        }

        function examineAvailabilityForDay(day) {
            if (
                availabilityState[year] &&
                availabilityState[year][month] &&
                availabilityState[year][month][day]
            ) {
                setTimes(availabilityState[year][month][day]);
            } else {
                setTimes(getDefaultTimes());
            }
            setActiveDay(day);
        }

        function addTimesToDay(day) {
            const newAvail = {...availabilityState};
            if (newAvail[year]) {
                if (newAvail[year][month]) {
                    if (newAvail[year][month][day]) {
                        newAvail[year][month][day] = combineTimeArrays(
                            newAvail[year][month][day],
                            times
                        );
                    } else {
                        newAvail[year][month][day] = times;
                    }
                } else {
                    newAvail[year][month] = {
                        [day]: times,
                    };
                }
            } else {
                newAvail[year] = {
                    [month]: {
                        [day]: times,
                    },
                };
            }
            setAvailabilityState(newAvail);
            setQuickAvailability(
                makeQuickAvailability(convertAvailabilityForDatabase(newAvail))
            );
        }
    };
};

export default CalendarTemplate;
