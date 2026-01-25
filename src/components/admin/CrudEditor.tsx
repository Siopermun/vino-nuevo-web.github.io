import React from 'react';
import { Button, Table } from 'react-bootstrap';

const CrudEditor = ({ items, columns, onAdd, onEdit, onDelete, itemName }: { items: any, columns: any, onAdd: any, onEdit: any, onDelete: any, itemName: any }) => {
    return (
        <>
            <Button variant="success" className="mb-3" onClick={onAdd}>
                Añadir Nuevo {itemName}
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {columns.map((col: any, index: any) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: any, rowIndex: any) => (
                        <tr key={rowIndex}>
                            {columns.map((col: any, colIndex: any) => (
                                <td key={colIndex}>
                                    {col.cell ? col.cell(item) : item[col.accessor]}
                                </td>
                            ))}
                            <td>
                                <Button variant="primary" size="sm" onClick={() => onEdit(item, rowIndex)}>Editar</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => onDelete(rowIndex)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default CrudEditor;
