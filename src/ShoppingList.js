import React, {Component} from "react";

const Title = ({prodCount}) => {
    return (
        <div>
            <div>
                <h2>Lista zakupów: ({prodCount}) pozycji!</h2>
            </div>
        </div>
    );
};

const Product = ({prod, remove}) => {
    return (
        <div className="list-group-item" onClick={() => {
            remove(prod.id)
        }}><u>Produkt:</u> {prod.text} <u>Ilość:</u> {prod.amount}</div>
    )
}

const ProductsList = ({prods, remove}) => {
    const prodNode = prods.map((prod) => {
        return (<Product prod={prod} key={prod.id} remove={remove}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{prodNode}</div>);
}

const ProdForm = ({addProd}) => {
    let inputProd;
    let inputAmount;
    return (
        <form>
            <input className="form-control col-md-12"  name="Nazwa produktu" ref={node => {
                inputProd = node;
            }} placeholder={"Podaj nazwę produktu"}/>

            <input className="form-control col-md-12"  name="Nazwa produktu" ref={node => {
                inputAmount = node;
            }}  placeholder={"Podaj ilość"}/>

            <button type="button" onClick={(e) => {
                e.preventDefault();
                console.log(inputProd.value);
                addProd(inputProd.value, inputAmount.value);
                inputProd.value = '';
                inputAmount.value = '';
            }}>Zatwierdz</button>
            <br/>
        </form>
    );

};

window.id = 0;

class ShoppingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.allStorage(),
        };
    }

    componentDidMount() {
        this.setState({data: this.state.data});
    }

    addProduct = (val, amount) => {
        localStorage.setItem("shopping." + val, amount);
        const todo = {text: val, id: window.id++, amount: amount};
        this.setState({data: this.state.data.concat([todo])});
    }

    handleRemoveProduct(id) {
        const toDelete = this.state.data.filter((todo) => {
            if (todo.id === id) return todo;
        });

        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });
        this.setState({
            data: remainder
        });

        localStorage.removeItem("shopping." + toDelete[0].text);
    }

    allStorage() {
        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            if(key.startsWith("shopping.", 0)) {
                const todo = {text: key.substring(9), id: window.id++, amount: localStorage.getItem(key)};
                archive.push(todo);
            }
        }

        return archive;
    }

    render() {
        return (
            <div className="componentContainer">
                <Title prodCount={this.state.data.length}/>
                <ProdForm addProd={this.addProduct}/>
                <h2>Produkty do kupinia:</h2>
                <ProductsList
                    prods={this.state.data}
                    remove={this.handleRemoveProduct.bind(this)}
                />
            </div>
        );
    }
}


export default ShoppingListComponent;