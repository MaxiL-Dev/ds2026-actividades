import { useEffect, useMemo, useRef, useState } from 'react';

export interface OpcionCombobox {
  id: number;
  etiqueta: string;
}

interface ComboboxProps {
  opciones: OpcionCombobox[];
  etiqueta: string;
  placeholder?: string;
  multi?: boolean;
  valor: number[];
  onChange: (ids: number[]) => void;
  invalid?: boolean;
  error?: string;
}

function Combobox({
  opciones,
  etiqueta,
  placeholder,
  multi = false,
  valor,
  onChange,
  invalid = false,
  error,
}: ComboboxProps) {
  const [texto, setTexto] = useState('');
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState(-1);
  const contenedorRef = useRef<HTMLDivElement>(null);

  const valorActual = useMemo(() => new Set(valor), [valor]);

  const etiquetaDe = (id: number) => opciones.find((o) => o.id === id)?.etiqueta ?? '';

  const textoSeleccion = useMemo(() => {
    if (multi) return '';
    return valor.length === 1 ? etiquetaDe(valor[0]) : '';
  }, [multi, valor, opciones]);

  const opcionesFiltradas = useMemo(() => {
    const q = texto.trim().toLowerCase();
    if (!q) return opciones;
    return opciones.filter((o) => o.etiqueta.toLowerCase().includes(q));
  }, [opciones, texto]);

  useEffect(() => {
    setResaltado(-1);
  }, [texto, opcionesFiltradas]);

  useEffect(() => {
    if (!abierto) return;

    const alHacerClickFuera = (e: MouseEvent) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };

    document.addEventListener('mousedown', alHacerClickFuera);
    return () => document.removeEventListener('mousedown', alHacerClickFuera);
  }, [abierto]);

  const cerrarVacio = () => {
    setAbierto(false);
    if (!multi) setTexto(textoSeleccion);
  };

  const seleccionar = (opcion: OpcionCombobox) => {
    if (multi) {
      if (valorActual.has(opcion.id)) {
        onChange(valor.filter((id) => id !== opcion.id));
      } else {
        onChange([...valor, opcion.id]);
      }
      setTexto('');
    } else {
      onChange([opcion.id]);
      setTexto(opcion.etiqueta);
      setAbierto(false);
    }
  };

  const manejarTecla = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAbierto(true);
      setResaltado((r) => Math.min(r + 1, opcionesFiltradas.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setResaltado((r) => Math.max(r - 1, 0));
    } else if (e.key === 'Enter') {
      if (abierto && resaltado >= 0 && opcionesFiltradas[resaltado]) {
        e.preventDefault();
        seleccionar(opcionesFiltradas[resaltado]);
      }
    } else if (e.key === 'Escape') {
      setAbierto(false);
      if (!multi) setTexto(textoSeleccion);
    }
  };

  const mostrarLista = abierto && opcionesFiltradas.length > 0;

  return (
    <div className="combobox" ref={contenedorRef}>
      <FormLabel etiqueta={etiqueta} />

      <div className="combobox-campo">
        <input
          className={`form-control input-buscador ${invalid ? 'combobox-invalido' : ''}`}
          role="combobox"
          aria-expanded={abierto}
          aria-controls="combobox-lista"
          aria-invalid={invalid}
          aria-autocomplete="list"
          placeholder={placeholder ?? 'Buscá y seleccioná...'}
          value={multi ? texto : (texto !== '' ? texto : textoSeleccion)}
          onChange={(e) => {
            setTexto(e.target.value);
            setAbierto(true);
          }}
          onFocus={() => {
            setAbierto(true);
            if (multi) setTexto('');
          }}
          onBlur={cerrarVacio}
          onKeyDown={manejarTecla}
        />
        {!multi && valor.length === 1 && (
          <button
            type="button"
            className="combobox-limpiar"
            aria-label={`Quitar ${etiqueta.toLowerCase()}`}
            title="Quitar selección"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onChange([]);
              setTexto('');
              setAbierto(true);
            }}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        )}
      </div>

      {multi && valor.length > 0 && (
        <div className="combobox-chips">
          {valor.map((id) => (
            <span key={id} className="combobox-chip">
              {etiquetaDe(id)}
              <button
                type="button"
                aria-label={`Quitar ${etiquetaDe(id)}`}
                onClick={() => seleccionar({ id, etiqueta: etiquetaDe(id) })}
              >
                <i className="bi bi-x"></i>
              </button>
            </span>
          ))}
        </div>
      )}

      {mostrarLista && (
        <ul id="combobox-lista" className="combobox-lista" role="listbox">
          {opcionesFiltradas.map((opcion, i) => (
            <li
              key={opcion.id}
              role="option"
              aria-selected={valorActual.has(opcion.id)}
              className={`combobox-opcion ${i === resaltado ? 'combobox-resaltada' : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => seleccionar(opcion)}
            >
              {multi && (
                <i
                  className={`bi ${valorActual.has(opcion.id) ? 'bi-check-square' : 'bi-square'}`}
                />
              )}
              {opcion.etiqueta}
            </li>
          ))}
        </ul>
      )}

      {abierto && opcionesFiltradas.length === 0 && (
        <div className="combobox-vacio">No se encontraron resultados.</div>
      )}

      {invalid && error && <div className="combobox-error">{error}</div>}
    </div>
  );
}

function FormLabel({ etiqueta }: { etiqueta: string }) {
  return (
    <label className="form-label" style={{ color: '#4a4a40', fontWeight: 'bold' }}>
      {etiqueta}
    </label>
  );
}

export default Combobox;