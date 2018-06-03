import React, {Component} from "react";

class Home extends Component {
    render() {
        return (
            <div className="componentContainer">
                <h2><font size="30">Witaj!!</font></h2>
                <p>Czy zdarzało Ci się pójść do sklepu po zakupy i w drodze do domu zorientować się, że zapomniałeś
                    czegoś kupić?
                    Albo byłeś w niezręcznej sytuacji bo zapominałeś o czyiś urodzinach lub nie przyszedłeś na wcześniej umówione
                    spotkanie ?
                    Może co gorsza miałeś jakieś zadanie do wykonania i też wypadło Ci ono z głowy?!
                    Nie martw się to koniec Twoich zmartwień!</p>
                <p><b>Mamy dla Ciebie rozwiązanie, to nasza aplikacja YourOrganizer!!!</b>&nbsp;Z nią nigdy już nie będziesz
                    marnował czasu na powrót do sklepu i uzupełnienie zakupów! Zawsze będziesz
                    pamiętał o spotkaniach oraz urodzinach bliskich i znajomych!!</p>
                <p>Aplikacja pozwala na zapisywanie czynności, które musisz wykonać. Odpowiada za to zakładka Organizer ->
                Lista "todo". Ponadto możesz tworzyć listę zakupów, abyś już nigdy nie musiał wracać się po zapomniane produkty.
                Kolejną bardzo ważną funkcjonalnością, jest możliwość zapisywania dni, w których Twoi znajomi i bliscy mają
                urodziny (Organizer -> Urodzinowa przypominajka). Cała zbiorcza informacja jest przedstawiona na kalendarzu,
                    dostępnym w zakładce Kalendarz. Dni, w których Twoi bliscy mają urodziny są podświetlane na żółto, natomiast
                    bierzący dzień na różowo.
                </p>
            </div>
        );
    }
}

export default Home;