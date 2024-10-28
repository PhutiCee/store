import React, { createContext } from "react";
import { db } from "../config/dbconfig";
import { collection, onSnapshot } from "firebase/firestore";

export const ProductsContext = createContext();

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error boundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export class ProductsContextsProvider extends React.Component {
    state = {
        products: []
    }

    componentDidMount() {
        const productsRef = collection(db, "products");

        onSnapshot(productsRef, snapshot => {
            const newProducts = [];
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    newProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductDescription: change.doc.data().ProductDescription,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                    });
                }
            });

            this.setState({ products: newProducts });
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: this.state.products }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}

export const ProductsProviderWithBoundary = ({ children }) => (
    <ErrorBoundary>
        <ProductsContextsProvider>
            {children}
        </ProductsContextsProvider>
    </ErrorBoundary>
);
