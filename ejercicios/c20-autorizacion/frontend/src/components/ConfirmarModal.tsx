import { Button, Modal, Spinner } from 'react-bootstrap';

interface ConfirmarModalProps {
  show: boolean;
  titulo: string;
  mensaje: string;
  confirmarTexto?: string;
  cancelarTexto?: string;
  confirmando?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmarModal({
  show,
  titulo,
  mensaje,
  confirmarTexto = 'Confirmar',
  cancelarTexto = 'Cancelar',
  confirmando = false,
  onConfirm,
  onCancel,
}: ConfirmarModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#b34535', color: '#fff7d4', borderBottom: '1px solid #8f2e21' }}
      >
        <Modal.Title className="d-flex align-items-center gap-2">
          <i className="bi bi-trash"></i> {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#fff7d4', color: '#2b2b26' }}>
        {mensaje}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#fff7d4', borderTop: '1px solid #e8dbab' }}>
        <Button variant="secondary" onClick={onCancel} style={{ marginTop: 0 }}>
          {cancelarTexto}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={confirmando} style={{ marginTop: 0, width: 'auto' }}>
          {confirmando ? <Spinner size="sm" /> : confirmarTexto}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmarModal;