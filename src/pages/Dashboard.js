import React, { useEffect, useState } from 'react';
import DashboardComponent from '../components/DashboardComponent';
import { createTicket, getTickets, updateTicket } from '../api/api';
import { toast } from 'react-toastify'

const Dashboard = () => {
 
  const [data, setData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Swiggy');
  const [restaurantBranch, setRestaurantBranch] = useState('Thane');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadAllTickets();
  }, [])


  const loadAllTickets = () => {
    getTickets(0,10)
    .then((res) => {
      console.log(res)
      setData(res);
    })
    .catch((err) => console.log(err))
  }

  const onDrop = (title, newIndex) => {
    console.log('drag2')
    if (activeCard === null || activeCard === undefined) return;

    setData((prevData) => {
      const newData = [...prevData];
      const { id, index: oldIndex } = activeCard;
      console.log(activeCard, oldIndex);
      const cardToMoveIndex = newData.findIndex((item) => item.id === id);
      if (cardToMoveIndex !== -1) {
        const [cardToMove] = newData.splice(cardToMoveIndex, 1);
        if (cardToMove.status === title) {
          newData.splice(newIndex, 0, cardToMove);
        } else {
          cardToMove.status = title;
          newData.splice(newIndex, 0, cardToMove);
          updateTicket(id, title) // Update status in the backend
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        }
      }
      return newData;
    });
  };

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleTicketCreation = () => {
    const ticketData = {
      title,
      platform,
      description,
      restaurant_branch: restaurantBranch,
      username
    };
    createTicket(ticketData)
    .then((res) => {
      console.log(res);
      toast.success('Ticket Created')
      handleCloseModal();
      setData([...data, res])
    })
    .catch((err) => console.log(err))
  }

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) => {
      return prevData.map(ticket => 
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      );
    });
  };

  return (
    <>
      <div className='box_container' style={isModalVisible ? styles.boxContainerWithModal : styles.boxContainer}>

        <div className='profile_bar' style={styles.profileBar}>
          <button onClick={handleAddButtonClick}>Add</button>
          <h5>Nisarg Barot</h5>
        </div>

        <div className='col_container' style={styles.colContainer}>
          <div className='ticket_col_container' style={styles.ticketColContainer}>
            <DashboardComponent title={'Unassigned'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} handleStatusChange={handleStatusChange}/>
            <DashboardComponent title={'On Hold'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} handleStatusChange={handleStatusChange}/>
            <DashboardComponent title={'Open'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} handleStatusChange={handleStatusChange}/>
            <DashboardComponent title={'Completed'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div style={styles.modalBackdrop} onClick={handleCloseModal}>
          <div style={styles.modalContainer} className='modalContainer' onClick={e => e.stopPropagation()}>
            <div style={styles.firstRowModal} className='firstRowModal'>

              <input style={styles.inputModal} onChange={e => setTitle(e.target.value)} placeholder='Title'></input>

              <label htmlFor="dropdown">Platform: </label>
              <select id="dropdown" defaultValue="Swiggy" onChange={e => setPlatform(e.target.value)}>
                <option value="Swiggy">Swiggy</option>
                <option value="Zomato">Zomato</option>
                <option value="Google">Google</option>
              </select>

            </div>

            <div style={styles.firstRowModal} className='secondRowModal'>
              <input style={styles.inputModal} placeholder='Name' onChange={e => setUsername(e.target.value)}></input>

              <label htmlFor="dropdown">Branch: </label>
              <select id="dropdown" defaultValue="Thane" onChange={e => setRestaurantBranch(e.target.value)}>
                <option value="Andheri">Andheri</option>
                <option value="Parel">Parel</option>
                <option value="Thane">Thane</option>
              </select>
            </div>

            <div style={styles.thirdRowModal} className='thirdRowModal'>
              <input style={{height: "40px", width: "95%"}} placeholder='Description' onChange={e => setDescription(e.target.value)}></input>

              <button style={{height: "40px", width: "95%", margin: "20px"}} 
              onClick={handleTicketCreation}>Create</button>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  boxContainer: {
    backgroundColor: '#ebebeb',
    padding: '30px',
    transition: 'opacity 0.3s ease',
    opacity: 1,
  },
  boxContainerWithModal: {
    backgroundColor: '#ebebeb',
    padding: '30px',
    transition: 'opacity 0.3s ease',
    opacity: 0.5,
  },
  profileBar: {
    backgroundColor: "white",
    height: "50px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  colContainer: {
    height: "100vh",
  },
  ticketColContainer: {
    height: '100%',
    display: 'flex',
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "10px",
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "300px"
  },
  firstRowModal:{
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "20px"
  },
  inputModal: {
    height: "40px",
    width: "50%"
  },
  thirdRowModal:{
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center"
  }
};

export default Dashboard;


// import React, { useState } from 'react'
// import DashboardComponent from '../components/DashboardComponent'
// const Dashboard = () => {

//   const initialData = [
//     {
//       id: 1,
//       title: "Missing Item issue",
//       platform: "Zomato",
//       status: "Unassigned",
//       restaurant: "MH01"
//     },
//     {
//       id: 2,
//       title: "Missing Item issue",
//       platform: "Google",
//       status: "Unassigned",
//       restaurant: "MH02"
//     },
//     {
//       id: 3,
//       title: "Missing Item issue",
//       platform: "Zomato",
//       status: "On Hold",
//       restaurant: "MH03"
//     },
//     {
//       id: 4,
//       title: "Missing Item issue",
//       platform: "Swiggy",
//       status: "Completed",
//       restaurant: "MH04"
//     },
//     {
//       id: 5,
//       title: "Missing Item issue",
//       platform: "Swiggy",
//       status: "Open",
//       restaurant: "MH05"
//     }
//   ]

//   const [data, setData] = useState(initialData);
//   const [activeCard, setActiveCard] = useState(null);
//   const onDrop = (title, newIndex) => {
//     // console.log(`${activeCard} is going to place into ${title} and at the position ${position}`);

//     if (activeCard === null || activeCard === undefined) return;

//     setData((prevData) => {
//       // const newData = [...prevData];
//       // const cardIndex = newData.findIndex((item) => item.id === activeCard);
//       // if (cardIndex !== -1) {
//       //   newData[cardIndex].status = title;
//       // }
//       // return newData;

//       const newData = [...prevData];
//       const { id, index: oldIndex } = activeCard;
//       console.log(activeCard, oldIndex);
//       // Find the card to move
//       const cardToMoveIndex = newData.findIndex((item) => item.id === id);
//       if (cardToMoveIndex !== -1) {
//         const [cardToMove] = newData.splice(cardToMoveIndex, 1);

//         // Insert the card at the new index within the same column
//         if (cardToMove.status === title) {
//           newData.splice(newIndex, 0, cardToMove);
//         } else {
//           cardToMove.status = title;
//           newData.splice(newIndex, 0, cardToMove);
//         }
//       }
//       return newData;
//     });

//   }


//   // const unassignedTickets = data.filter(ticket => ticket.status === 'Unassigned');
//   // const onHoldTickets = data.filter(ticket => ticket.status === 'On Hold');
//   // const openTickets = data.filter(ticket => ticket.status === 'Open');
//   // const completedTickets = data.filter(ticket => ticket.status === 'Completed');  

//   return (
//     <>
//       <div className='box_container' style={styles.boxContainer}>

//         <div className='profile_bar' style={styles.profileBar}>
//           <button>Add</button>
//           <h5>Nisarg Barot</h5>
//         </div>

//         <div className='col_container' style={styles.colContainer}>
//           <div className='ticket_col_container' style={styles.ticketColContainer}>
//             <DashboardComponent title={'Unassigned'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} />
//             <DashboardComponent title={'On Hold'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} />
//             <DashboardComponent title={'Open'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} />
//             <DashboardComponent title={'Completed'} tickets={data} setActiveCard={setActiveCard} onDrop={onDrop} />
//           </div>
//         </div>

//       </div>

//       <div style={styles.modalContainer} className='modalContainer'>

//         <div className='firstRowModal'>
//           <input placeholder='Title'></input>
//           <label htmlFor="dropdown">Choose an option: </label>
//           <select id="dropdown" defaultValue="Swiggy">
//             <option value="Swiggy">Swiggy</option>
//             <option value="Zomato">Zomato</option>
//             <option value="Google">Google</option>
//           </select>
//         </div>

//         <div className='secondRowModal'>
//           <input placeholder='Title'></input>
//           <label htmlFor="dropdown">Choose an option: </label>
//           <select id="dropdown" defaultValue="Thane">
//             <option value="Andheri">Andheri</option>
//             <option value="Parel">Parel</option>
//             <option value="Thane">Thane</option>
//           </select>
//         </div>

//         <div className='thirdRowModal'>
//           <input placeholder='Description'></input>
//         </div>

//       </div>


//     </>
//   )
// }

// const styles = {
//   boxContainer: {
//     backgroundColor: '#ebebeb',
//     padding: '30px'
//   },
//   profileBar: {
//     // Add styles for the profile bar here
//     backgroundColor: "white",
//     height: "50px",
//     borderRadius: "5px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px"
//   },
//   colContainer: {
//     // Add styles for the column container here
//     height: "100vh"
//   },
//   ticketColContainer: {
//     height: '100%',
//     display: 'flex',
//     backgroundColor: "white",
//     borderRadius: "5px",
//     marginTop: "10px"
//   },
//   modalContainer:{
//     display: "none",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)"
//   }
// };

// export default Dashboard
