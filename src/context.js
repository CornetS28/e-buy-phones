import React, { Component } from "react";
import { ourPhones, detailPhone } from "./data";

const PhoneContext = React.createContext();
// CONTEXT A=HAS 2 STEPS: 1. Provider AND 2.Consumer

class PhoneProvider extends Component {
  state = {
    phones: [],
    detailPhone: detailPhone,
    cart: [],
    modalIsOpen: false,
    modalPhone: detailPhone,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  // Get the copy of the data, instead of referencing (the original) them
  // also called 'DESTRUCTORING'
  componentDidMount() {
    this.setPhones();
  }
  setPhones = () => {
    let tempPhones = [];
    ourPhones.forEach((phone) => {
      const singlePhone = { ...phone };
      tempPhones = [...tempPhones, singlePhone];
    });
    this.setState({
      phones: tempPhones,
    });
  };

  // setProducts = () => {
  //   let products = [];
  //   storeProducts.forEach((item) => {
  //     const singleItem = { ...item };
  //     products = [...products, singleItem];
  //   });
  //   this.setState(() => {
  //     return { products };
  //   }, this.checkCartItems);
  // };
  // Get the copy of the data (ENDS HERE)

  getPhoneId = (id) => {
    return this.state.phones.find((phone) => phone.id === id);
  };

  detailHandler = (id) => {
    const phone = this.getPhoneId(id);
    this.setState(() => {
      return { detailPhone: phone };
    });
  };

  addToCart = (id) => {
    let tempPhones = [...this.state.phones];
    const index = tempPhones.indexOf(this.getPhoneId(id));
    const phone = tempPhones[index];
    phone.inCart = true;
    phone.count = 1;
    const price = phone.price;
    phone.total = price;

    this.setState(() => {
      return {
        phones: [...tempPhones],
        cart: [...this.state.cart, phone],
        detailphone: { ...phone },
      };
    }, this.addTotals);
  };

  openModal = (id) => {
    const phone = this.getPhoneId(id);
    this.setState(() => {
      return { modalPhone: phone, modalIsOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalIsOpen: false };
    });
  };

  increase = (id) => {
    let tempCart = [...this.state.cart];
    const selectedPhone = tempCart.find((phone) => {
      return phone.id === id;
    });
    const index = tempCart.indexOf(selectedPhone);
    const phone = tempCart[index];
    phone.count = phone.count + 1;
    phone.total = phone.count * phone.price;
    this.setState(() => {
      return {
        cart: [...tempCart],
      };
    }, this.addTotals);
  };

  decrease = (id) => {
    let tempCart = [...this.state.cart];
    const selectedPhone = tempCart.find((phone) => {
      return phone.id === id;
    });
    const index = tempCart.indexOf(selectedPhone);
    const phone = tempCart[index];
    phone.count = phone.count - 1;
    if (phone.count === 0) {
      this.removePhone(id);
    } else {
      phone.total = phone.count * phone.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };

  removePhone = (id) => {
    let tempPhones = [...this.state.phones];
    let tempCart = [...this.state.cart];

    const index = tempPhones.indexOf(this.getPhoneId(id));
    let removedPhone = tempPhones[index];
    removedPhone.inCart = false;
    removedPhone.count = 0;
    removedPhone.total = 0;

    tempCart = tempCart.filter((item) => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempPhones],
      };
    }, this.addTotals);
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setPhones();
        this.addTotals();
      }
    );
  };

  getTotals = () => {
    // const subTotal = this.state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };

  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total,
        };
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  render() {
    return (
      <PhoneContext.Provider
        value={{
          ...this.state,
          detailHandler: this.detailHandler,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increase: this.increase,
          decrease: this.decrease,
          removePhone: this.removePhone,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </PhoneContext.Provider>
    );
  }
}
const PhoneConsumer = PhoneContext.Consumer;

export { PhoneProvider, PhoneConsumer };
