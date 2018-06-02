import React, {Component} from "react";

const MonthTitle = ({monthNameTitle}) => {
    return (
            <li>
                {monthNameTitle}<br/>
                <span styles="font-size:22px">2018</span>
            </li>
    );
};

const BirthDay = ({day}) => {
    return (
        <li><span className="birthday">{day.dayIndex}</span></li>
    )
}

const CurrentDay = ({day}) => {
    return (
        <li><span className="active">{day.dayIndex}</span></li>
    )
}

const NormalDay = ({day}) => {
    return (
        <li>{day.dayIndex}</li>
    )
}

const Month = ({monthName, daysInMonth}) => {
    const MonthNode = daysInMonth.map((day) => {
        if(day.ifBirth)
            return <BirthDay day={day} key={day.id}/>

        else if(day.ifCurrentDay)
            return <CurrentDay day={day} key={day.id}/>

        else
            return <NormalDay day={day} key={day.id}/>
    });
    return MonthNode;
}

window.id = 0
class CalendarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMonth: this.setCurrentMonth(),
            monthIndex: this.setCurrentMonth(),
            currentDay: new Date().getDate(),
            days: this.getDaysInMonth(new Date().getMonth(), new Date().getDate(), new Date().getMonth())
        };

        this.changeOnPrevMonth = this.changeOnPrevMonth.bind(this);
        this.changeOnNextMonth = this.changeOnNextMonth.bind(this);
    }

    componentDidMount() {
        console.log("done")
    }

    setCurrentMonth() {
        var today = new Date();
        var monthIndex = today.getMonth();
        console.log('monthIndex: ' + monthIndex);
        return monthIndex;
    }

    getMonthName(monthIndex) {
        switch (monthIndex) {
            case 0:
                return "Styczeń";
            case 1:
                return "Luty";
            case 2:
                return "Marzec";
            case 3:
                return "Kwiecień";
            case 4:
                return "Maj";
            case 5:
                return "Czerwiec";
            case 6:
                return "Lipiec";
            case 7:
                return "Sierpień";
            case 8:
                return "Wrzesień";
            case 9:
                return "Październik";
            case 10:
                return "Listopad";
            case 11:
                return "Grudzień";
        }
    }

    getDaysInMonth(monthIndex, currentDay, currentMonth) {
        var monthName = this.getMonthName(monthIndex);
        var amountOfDaysInMonth = this.getAmountOfDaysInMonth(monthName);

        var birthsInMonth = this.getBirthdaysInMonth(monthName);
        var firstDay = new Date(2018, monthIndex, 1);
        var array = this.getInitialEmptyDays(firstDay);
        for (var i = 0; i < amountOfDaysInMonth; i++) {
            const day = {dayIndex: i + 1, id: window.id++, ifCurrentDay: false, ifBirth: this.checkIfBirthday(i + 1, birthsInMonth)};
            if (i === currentDay && monthIndex === currentMonth) {
                day.ifCurrentDay = true;
            }
            array.push(day)
        }
        return array;
    }

    getInitialEmptyDays(firstDay) {
        var dayweek = firstDay.getDay();
        if(dayweek == 0) dayweek = 7;
        var emptyDays = [];
        for(var i = 1; i < dayweek; i++) {
            const day = {dayIndex: '', id: window.id++, ifCurrentDay: false, ifBirth: false};
            emptyDays.push(day);
        }
        return emptyDays;
    }

    checkIfBirthday(dayIndex, birthsInMonth) {
        for (var i = 0; i < birthsInMonth.length; i++) {
            if (birthsInMonth[i] == dayIndex) {
                return true;
            }
        }
        return false;
    }

    getAmountOfDaysInMonth(monthName) {
        if (monthName === "Styczeń" || monthName === "Marzec" || monthName === "Maj" || monthName === "Lipiec"
            || monthName === "Sierpień" || monthName === "Październik" || monthName === "Grudzień") {
            return 31;
        } else if (monthName === "Kwiecień" || monthName === "Czerwiec" || monthName === "Wrzesień"
            || monthName === "Listopad") {
            return 30;
        } else {
            return 28;
        }
    }


    getBirthdaysInMonth(monthName) {
        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            if (key.startsWith("birthday.", 0)) {
                var fullDate = localStorage.getItem(key);
                if (fullDate.includes(monthName)) {
                    var indexOfComma = fullDate.indexOf(".");
                    const birth = {
                        text: key.substring(9),
                        id: window.id++,
                        dayIndex: fullDate.substring(0, indexOfComma)
                    };
                    archive.push(birth.dayIndex, birth.id);
                }
            }
        }
        return archive.sort((a, b) => a.dayIndex - b.dayIndex);
    }

    changeOnPrevMonth() {
        var newMonthIndex = this.state.monthIndex - 1;
        if(newMonthIndex < 0) newMonthIndex = 11;
        this.setState({monthIndex: newMonthIndex});
        this.setState({days: this.getDaysInMonth(newMonthIndex, this.state.currentDay, this.state.currentMonth)})
    }

    changeOnNextMonth() {
        var newMonthIndex = (this.state.monthIndex + 1) % 12;
        this.setState({monthIndex: newMonthIndex});
        this.setState({days: this.getDaysInMonth(newMonthIndex, this.state.currentDay, this.state.currentMonth)})
    }

    render() {
        return (
            <div className="componentContainer">
                <div className="month">
                    <ul>
                        <li className="prev" onClick={this.changeOnPrevMonth}>&#10094;</li>
                        <li className="next" onClick={this.changeOnNextMonth}>&#10095;</li>
                    <MonthTitle monthNameTitle={this.getMonthName(this.state.monthIndex)}/>
                    </ul>
                </div>

                <ul className="weekdays">
                    <li>Pon</li>
                    <li>Wt</li>
                    <li>Śr</li>
                    <li>Czw</li>
                    <li>Pt</li>
                    <li>Sob</li>
                    <li>Nied</li>
                </ul>

                <ul className="days">
                    <Month
                        monthName={this.getMonthName(this.state.monthIndex)}
                        daysInMonth={this.state.days}
                    />
                </ul>
            </div>
        );
    }
}


export default CalendarComponent;