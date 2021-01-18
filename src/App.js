import React, { useEffect, useState } from 'react'
import { Formulario } from './components/Formulario'
import { ListadoImagenes } from './components/ListadoImagenes';


export const App = () => {

    const [busqueda, setBusqueda] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalpaginas, setTotalpaginas] = useState(1);

    useEffect(() => {
        const consultarAPI = async () => {
            if ( busqueda === '' ) return;

            const perPage = 30;
            const key = '18604097-d314034e3a4bab3b9373cd1bb';
            const url = `https://pixabay.com/api/?key=${ key }&q=${ busqueda }&per_page=${ perPage }&page=${ paginaActual }`;

            const resp = await fetch( url );
            const data = await resp.json();
            setImagenes( data.hits );

            const calcularTotalPaginas = Math.ceil( data.totalHits / perPage );

            setTotalpaginas( calcularTotalPaginas );

            // mover la pantalla hacia arriba
            document.querySelector('.jumbotron').scrollIntoView({ behavior: 'smooth'});
        }
        consultarAPI();
    }, [ busqueda, paginaActual ])



    const paginaAnterior = () => {
        const nuevaPaginaActual = paginaActual - 1;
        if ( nuevaPaginaActual === 0 ) return;
        setPaginaActual( nuevaPaginaActual );

    }
    const paginaSiguite = () => {
        const nuevaPaginaActual = paginaActual + 1;
        if ( nuevaPaginaActual > totalpaginas ) return;
        setPaginaActual( nuevaPaginaActual );
    }
    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imágener</p>
                <Formulario
                    setBusqueda={ setBusqueda }
                />
            </div>
            <div className="row justify-content-center">
                <ListadoImagenes
                    imagenes={ imagenes }
                />

                {
                    ( paginaActual > 1 )
                        &&
                            <button
                                type="button"
                                className="btn btn-info mr-1"
                                onClick={ paginaAnterior }
                            >
                                &laquo; Anterior
                            </button>
                }
                {
                    ( paginaActual < totalpaginas )
                        &&
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={ paginaSiguite }
                            >
                                Siguiente &raquo;
                            </button>
                }
            </div>
        </div>
    )
}
