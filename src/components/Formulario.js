import React, { useState } from 'react'
import { Error } from './Error';

export const Formulario = ({ setBusqueda }) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState( false );

    const handleSubmit = e => {
        e.preventDefault();

        if ( termino.trim() === '' ) {
            setError( true );
            return;
        }
        setError( false );
        setBusqueda( termino );
    }
    return (
        <form
            onSubmit={ handleSubmit }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: café, deporte..."
                        onChange={ e =>  setTermino( e.target.value ) }
                        value={ termino }
                    />
                </div>
                <div className="form-group col-md-4">
                    <button
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                    >
                        Buscar
                    </button>
                </div>

            </div>
                {
                    ( error ) && <Error mensaje="Agrega un termino de bésqueda"/>
                }
        </form>
    )
}
