import React from 'react'
import DropArea from './DropArea'
import { updateTicket } from '../api/api'
import { useNavigate } from 'react-router-dom'

const DashboardComponent = ({ title, setActiveCard, onDrop, tickets, handleStatusChange}) => {

    const navigate = useNavigate();
    const handleStatusChangeOfTicket = (e, ticket) => {
        console.log(e);

        updateTicket(ticket.id, e)
        .then((res) => {
            console.log(res)
            handleStatusChange(ticket.id, e); 
        })
        .catch((err) => console.log(err))
    }

    const viewTicket = (tickets) => {
        navigate('/ticket', {state: tickets, title})
    }

    return (
        <>
            <div className='column' style={styles.column}>
                <h2>{title}</h2>
                <DropArea onDrop={() => onDrop(title, 0)} />

                {tickets.length > 0 && tickets.map((tickets, index) => (
                    tickets.status.toLowerCase() === title.toLowerCase() && (
                        <React.Fragment key={index}>
                            <div
                                draggable
                                onDrag={() => setActiveCard({ id: tickets.id, index: index })}
                                onDragEnd={() => setActiveCard(null)}
                                style={styles.dashCardContainer}
                                index={index}
                                onClick={() => viewTicket(tickets)}
                            >
                                <div style={styles.topLeft}>{tickets.title}</div>
                                <div style={styles.topRight}>{tickets.platform}</div>
                                <label style={styles.labelBottomLeft} htmlFor="dropdown">Status: </label>
                                <select onClick={(e) => e.stopPropagation()} style={styles.bottomLeft} id="dropdown" defaultValue={title} onChange={e => handleStatusChangeOfTicket(e.target.value, tickets)}>
                                    <option value="Unassigned">Unassigned</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Open">Open</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <div style={styles.bottomRight}>{tickets.restaurant_branch}</div>
                            </div>
                            <DropArea onDrop={() => onDrop(title, index + 1)} />
                        </React.Fragment>
                    )

                ))}
                {/* <DropArea onDrop={() => onDrop(title, tickets.length)} /> */}
            </div>
        </>
    )
}

const styles = {
    column: {
        width: "25%",
        backgroundColor: "#e6ebf0",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        alignItems: "center",
        paddingTop: "20px"
    },
    dashCardContainer: {
        position: 'relative',
        width: '80%',
        height: '150px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        // padding: '20px',
        backgroundColor: '#fff',
        marginBottom: "15px",
        cursor: "grab"
    },
    cardContainerActive: {
        opacity: "0.7",
        border: "2px solid black"
    },
    topLeft: {
        position: 'absolute',
        top: '10px',
        left: '10px'
    },
    topRight: {
        position: 'absolute',
        top: '10px',
        right: '10px'
    },
    bottomLeft: {
        position: 'absolute',
        bottom: '10px',
        left: '10px'
    },
    labelBottomLeft: {
        position: 'absolute',
        top: '84px',
        left: '10px'
    },
    bottomRight: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
    }
}

export default DashboardComponent
