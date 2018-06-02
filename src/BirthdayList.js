import React, {Component} from "react";

window.id = 0;

const Title = () => {
    return (
        <div>
            <div>
                <h2>Urodzinowa przypominajka!</h2>
            </div>
        </div>
    );
};

const Birthday = ({birth, remove}) => {
    console.log(birth.dayIndex);
    return (
        <div className="list-group-item" onClick={() => {
            remove(birth.id)
        }}>{birth.dayIndex}.  {birth.text}</div>
    )
}

const BirthdayList = ({births, remove}) => {
    const birthNode = births.map((birth) => {
        return (<Birthday birth={birth} key={birth.id} remove={remove}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{birthNode}</div>);
}


const BirthForm = ({addBirth}) => {
    let inputName;
    let day;
    let month;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            console.log(inputName);
            addBirth(inputName.value, day.value, month.value);
            inputName.value = '';
            day.value = 1;
            month.value = 'Styczeń';
        }}>
            <input className="form-control col-md-12"  name="Nazwa produktu" ref={node => {
                inputName = node;
            }} placeholder={"Wpisz dane osoby"}/>

            <div className="form-group">
                <label>Dzień: </label>
                <select className="form-control" ref={node => day = node}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                </select>
            </div>

            <div className="form-group">
                <label>Miesiąc: </label>
                <select className="form-control" ref={node => month = node}>
                    <option>Styczeń</option>
                    <option>Luty</option>
                    <option>Marzec</option>
                    <option>Kwiecień</option>
                    <option>Maj</option>
                    <option>Czerwiec</option>
                    <option>Lipiec</option>
                    <option>Sierpień</option>
                    <option>Wrzesień</option>
                    <option>Październik</option>
                    <option>Listopad</option>
                    <option>Grudzień</option>
                </select>
            </div>
            <br/>
        </form>
    );

};

class BirthdayListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jan: this.allStorageForMonth("Styczeń"),
            feb: this.allStorageForMonth("Luty"),
            march: this.allStorageForMonth("Marzec"),
            april: this.allStorageForMonth("Kwiecień"),
            may: this.allStorageForMonth("Maj"),
            june: this.allStorageForMonth("Czerwiec"),
            july: this.allStorageForMonth("Lipiec"),
            august: this.allStorageForMonth("Sierpień"),
            october: this.allStorageForMonth("Wrzesień"),
            semptember: this.allStorageForMonth("Październik"),
            november: this.allStorageForMonth("Listopad"),
            december: this.allStorageForMonth("Grudzień"),
        };
    }

    componentDidMount() {
        console.log("done")
    }

    addDayToSuitableArray(date, month){
        switch(month) {
            case 'Styczeń':this.setState({jan: this.state.jan.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Luty': this.setState({feb: this.state.feb.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Marzec': this.setState({march: this.state.march.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Kwiecień': this.setState({april: this.state.april.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Maj': this.setState({may: this.state.may.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Czerwiec': this.setState({june: this.state.june.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Lipiec': this.setState({july: this.state.july.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Sierpień': this.setState({august: this.state.august.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Wrzesień': this.setState({october: this.state.october.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Październik': this.setState({semptember: this.state.semptember.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Listopad': this.setState({november: this.state.november.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
            case 'Grudzień': this.setState({december: this.state.december.concat([date])
                    .sort((a, b) => a.dayIndex - b.dayIndex)});
                break;
        }
    }

    addBirthday = (val, day, month) => {
        localStorage.setItem("birthday." + val, day.toString() + '.' + month.toString());
        const date = {text: val, id: window.id++, dayIndex: day};
        this.addDayToSuitableArray(date, month);
        //this.setState({data: this.state.data.concat([todo]).sort((a, b) => a.priority - b.priority)});
    };

    handleRemoveBirthday(id) {
        var toDelete;

        if((toDelete = this.state.jan.filter((birth) => {
            if (birth.id === id) return birth;
        })).length > 0) {
            this.setState({
                jan: this.state.jan.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.feb.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                feb: this.state.feb.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.march.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                march: this.state.march.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.april.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                april: this.state.april.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.may.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                may: this.state.may.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.june.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                june: this.state.june.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.july.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                july: this.state.july.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.august.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                august: this.state.august.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.october.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                october: this.state.october.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.semptember.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                semptember: this.state.semptember.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.november.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                november: this.state.november.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        else if((toDelete = this.state.december.filter((birth) => {
                if (birth.id === id) return birth;
            })).length > 0) {
            this.setState({
                december: this.state.december.filter((birth) => {
                    if (birth.id !== id) return birth;
                })
            });
        }

        localStorage.removeItem("birthday." + toDelete[0].text);
    }

    allStorageForMonth(month) {
        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            if (key.startsWith("birthday.", 0)) {
                var fullDate = localStorage.getItem(key);
                if(fullDate.includes(month)) {
                    var indexOfComma = fullDate.indexOf(".");
                    const birth = {text: key.substring(9), id: window.id++, dayIndex: fullDate.substring(0, indexOfComma)};
                    archive.push(birth)
                }
            }
        }
        return archive.sort((a, b) => a.dayIndex - b.dayIndex);
    }

    render() {
        return (
            <div className="componentContainer">
                <Title/>
                <BirthForm addBirth={this.addBirthday}/>
                <h3>Styczeń</h3>
                <BirthdayList
                    births={this.state.jan}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Luty</h3>
                <BirthdayList
                    births={this.state.feb}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Marzec</h3>
                <BirthdayList
                    births={this.state.march}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Kwiecień</h3>
                <BirthdayList
                    births={this.state.april}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Maj</h3>
                <BirthdayList
                    births={this.state.may}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Czerwiec</h3>
                <BirthdayList
                    births={this.state.june}
                    remove={this.handleRemoveBirthday.bind(this)}
                /><h3>Lipiec</h3>
                <BirthdayList
                    births={this.state.july}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Sierpień</h3>
                <BirthdayList
                    births={this.state.august}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Wrzesień</h3>
                <BirthdayList
                    births={this.state.october}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Paźdzernik</h3>
                <BirthdayList
                    births={this.state.semptember}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Listopad</h3>
                <BirthdayList
                    births={this.state.november}
                    remove={this.handleRemoveBirthday.bind(this)}
                />
                <h3>Grudzień</h3>
                <BirthdayList
                    births={this.state.december}
                    remove={this.handleRemoveBirthday.bind(this)}
                />

                {/*<form onSubmit={(e) => {*/}
                    {/*e.preventDefault();*/}
                    {/*console.log(this.state.inputName);*/}
                    {/*this.addBirthday(this.state.inputName.value, this.state.day.value, this.state.month.value);*/}
                    {/*this.state.inputName.value = '';*/}
                    {/*this.state.day.value = 1;*/}
                    {/*this.state.month.value = 'Styczeń';*/}
                {/*}}>*/}
                    {/*<input className="form-control col-md-12"  name="Nazwa produktu" ref={node => {*/}
                        {/*this.state.inputName = node;*/}
                    {/*}} placeholder={"Wpisz dane osoby"}/>*/}

                    {/*<div className="form-group">*/}
                        {/*<label>Dzień: </label>*/}
                        {/*<select className="form-control" ref={node => this.state.day = node}>*/}
                            {/*<option>1</option>*/}
                            {/*<option>2</option>*/}
                            {/*<option>3</option>*/}
                            {/*<option>4</option>*/}
                            {/*<option>5</option>*/}
                            {/*<option>6</option>*/}
                            {/*<option>7</option>*/}
                            {/*<option>8</option>*/}
                            {/*<option>9</option>*/}
                            {/*<option>10</option>*/}
                            {/*<option>11</option>*/}
                            {/*<option>12</option>*/}
                            {/*<option>13</option>*/}
                            {/*<option>14</option>*/}
                            {/*<option>15</option>*/}
                            {/*<option>16</option>*/}
                            {/*<option>17</option>*/}
                            {/*<option>18</option>*/}
                            {/*<option>19</option>*/}
                            {/*<option>20</option>*/}
                            {/*<option>21</option>*/}
                            {/*<option>22</option>*/}
                            {/*<option>23</option>*/}
                            {/*<option>24</option>*/}
                            {/*<option>25</option>*/}
                            {/*<option>26</option>*/}
                            {/*<option>27</option>*/}
                            {/*<option>28</option>*/}
                            {/*<option>29</option>*/}
                            {/*<option>30</option>*/}
                            {/*<option>31</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}

                    {/*<div className="form-group">*/}
                        {/*<label>Miesiąc: </label>*/}
                        {/*<select className="form-control" ref={node => this.state.month = node}>*/}
                            {/*<option>Styczeń</option>*/}
                            {/*<option>Luty</option>*/}
                            {/*<option>Marzec</option>*/}
                            {/*<option>Kwiecień</option>*/}
                            {/*<option>Maj</option>*/}
                            {/*<option>Czerwiec</option>*/}
                            {/*<option>Lipiec</option>*/}
                            {/*<option>Sierpień</option>*/}
                            {/*<option>Wrzesień</option>*/}
                            {/*<option>Październik</option>*/}
                            {/*<option>Listopad</option>*/}
                            {/*<option>Grudzień</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}
                    {/*<br/>*/}
                {/*</form>*/}
                {/*<div id = "january" className="month"><h3>Styczeń</h3>*/}
                {/*</div>*/}
                {/*<div id = "february"className="month"><h3>Luty</h3>*/}
                {/*</div>*/}
                {/*<div id = "march" className="month"><h3>Marzec</h3>*/}
                {/*</div>*/}
                {/*<div id = "april" className="month"><h3>Kwiecień</h3>*/}
                {/*</div>*/}
                {/*<div id = "may" className="month"><h3>Maj</h3>*/}
                {/*</div>*/}
                {/*<div id = "june" className="month"><h3>Czerwiec</h3>*/}
                {/*</div>*/}
                {/*<div id = "july" className="month"><h3>Lipiec</h3>*/}
                {/*</div>*/}
                {/*<div id = "august" className="month"><h3>Sierpień</h3>*/}
                {/*</div>*/}
                {/*<div id = "october" className="month"><h3>Wrzesień</h3>*/}
                {/*</div>*/}
                {/*<div id = "september" className="month"><h3>Październik</h3>*/}
                {/*</div>*/}
                {/*<div id = "november" className="month"><h3>Listopad</h3>*/}
                {/*</div>*/}
                {/*<div id = "december" className="month"><h3>Listopad</h3>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default BirthdayListComponent;