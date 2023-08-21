import React, { Component } from 'react';

export default class CreateRemito extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fecha: '',
            responsable: '',
            observaciones: '',
            origen: '',
            destino: '',
            entrega: '',
            productos: [{nombre: '', cantidad: ''}]
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleProductoChange = (index, event) => {
        const productos = [...this.state.productos];
        productos[index][event.target.name] = event.target.value;
        this.setState({ productos });
    }

    addProducto = () => {
        this.setState(prevState => ({
            productos: [...prevState.productos, {nombre: '', cantidad: ''}]
        }));
    }

    removeProducto = (index) => {
        const productos = [...this.state.productos];
        productos.splice(index, 1);
        this.setState({ productos });
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        const { fecha, responsable, observaciones, origen, destino, entrega, productos } = this.state;
    
        const remito = {
            fecha,
            responsable,
            observaciones,
            origen,
            destino,
            entrega,
            productos
        };
    
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbz3eOl8-zBdsURoCtvZLeLSEzAugqPdwfvqL5EZ2r28iHG_zEKtfPnJMXmAIwIlwuWF7w/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(remito)
            });
    
            const data = await response.json();
            if (data.status === 'success') {
                alert('Remito creado exitosamente');
            } else {
                alert('Error al crear remito: ' + data.message);
            }
        } catch (error) {
            console.error("Error detallado:", error);
            alert('Error al enviar datos: ' + error.message);
        }
    }
    
    render() {
        return (
            <div>
                <h2>Create Remito</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Fecha:
                        <input type="date" name="fecha" value={this.state.fecha} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Responsable:
                        <input type="text" name="responsable" value={this.state.responsable} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Observaciones:
                        <input type="text" name="observaciones" value={this.state.observaciones} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Origen:
                        <input type="text" name="origen" value={this.state.origen} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Destino:
                        <input type="text" name="destino" value={this.state.destino} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Entrega:
                        <input type="text" name="entrega" value={this.state.entrega} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    
                    {this.state.productos.map((producto, index) => (
                        <div key={index}>
                            <label>
                                Producto:
                                <input type="text" name="nombre" value={producto.nombre} onChange={event => this.handleProductoChange(index, event)} />
                            </label>
                            <label>
                                Cantidad:
                                <input type="number" name="cantidad" value={producto.cantidad} onChange={event => this.handleProductoChange(index, event)} />
                            </label>
                            <button type="button" onClick={() => this.removeProducto(index)}>Eliminar</button>
                        </div>
                    ))}
                    
                    <button type="button" onClick={this.addProducto}>Agregar Producto</button>
                    <br />
                    <button type="submit">Crear Remito</button>
                </form>
            </div>
        );
    }
}
