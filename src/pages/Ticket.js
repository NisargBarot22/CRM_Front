import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCurrentUser, getComments, createCommentOnTicket } from '../api/api'

const Ticket = () => {

  const location = useLocation()
  const [user, setUser] = useState({});
  const [createComment, setCreateComment] = useState('');
  const [addComment, setAddComment] = useState([]);
  const data = location.state;
  console.log(data)

  useEffect(() => {
    getCommentForTicket();
    getCurrentUserDetails();
  },[])

  const getCurrentUserDetails = () =>{
    getCurrentUser()
    .then((res) => setUser(res))
    .catch((err) => console.log(err))
  }

  const getCommentForTicket = () => {
    getComments(data.id)
      .then((res) => {
        setAddComment(res);
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  function calculateDaysAgo(targetDate) {
    const currentDate = new Date();

    const currentTimestamp = currentDate.getTime();
    const targetTimestamp = new Date(targetDate).getTime();

    const difference = currentTimestamp - targetTimestamp;

    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

    return daysAgo;
  }



  function convertISTtoUTCandFormat(dateString) {
    let utcDate = new Date(dateString);

    let istTime = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));

    let formattedIST = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(istTime);

    return formattedIST;
  }

  function getTimeFromDate(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
  }

  const addComments = () => {
    if(createComment.length > 0){
      const commentData = {
        text: createComment,
    };
    
      createCommentOnTicket(data.id, commentData)
      .then((res) => {
        console.log(res)
        setAddComment([...addComment, res])
      })
      .catch((err) => {
        console.log(err);
      })
    } 
    
  }


  return (
    <>
      <div style={styles.mainContainer}>

        <div style={styles.firstCol}>
          <h2 style={{ fontWeight: "bold" }}>{data.status}</h2>
          <div style={styles.cardContainer}>
            <div style={styles.topLeft}>{data.title}</div>
            <div style={styles.topRight}>{data.platform}</div>
            <div style={styles.bottomLeft}>{getTimeFromDate(data.created_at)}</div>
            <div style={styles.bottomRight}>{data.status}</div>
          </div>
        </div>

        <div style={styles.secondCol}>
          <div style={styles.keyCardContainer}>
            <h3 style={{ marginBottom: "22px" }}>Key Information</h3>

            <p style={styles.pTag}>Brand Name</p>
            <h5 style={styles.bTag}>{data.username}</h5>

            <p style={styles.pTag}>City</p>
            <h5 style={styles.bTag}>Mumbai</h5>

            <p style={styles.pTag}>Subzone</p>
            <h5 style={styles.bTag}>{data.restaurant_branch}</h5>

            <p style={styles.pTag}>Ticket Owner</p>
            <h5 style={styles.bTag}>{data.username}</h5>

            <p style={styles.pTag}>Status</p>
            <h5 style={styles.bTag}>{data.status}</h5>

          </div>

          <div style={styles.orderCardContainer}>
            <h3 style={{ marginBottom: "22px", fontSize: "20px" }}>Order Information</h3>

            <p style={styles.pTag}>Platform</p>
            <h5 style={styles.bTag}>{data.platform}</h5>

            <p style={{ textDecoration: "underline" }}>Order Details</p>

          </div>

          <div style={styles.ticketCardContainer}>
            <h3 style={{ marginBottom: "22px", fontSize: "20px" }}>Ticket Information</h3>

            <p style={styles.pTag}>Created On Date</p>
            <h5 style={styles.bTag}>{convertISTtoUTCandFormat(data.created_at)}</h5>

            <p style={styles.pTag}>Due Date</p>
            <h5 style={styles.bTag}>{convertISTtoUTCandFormat(data.created_at)}</h5>

          </div>
        </div>

        {/* Third column */}
        <div style={styles.thirdCol}>
          <div style={styles.header}>
            <h3 style={{ fontSize: "25px", color: "orange" }}>{user.username}'s review</h3>
            <h3 style={{ fontSize: "25px", color: "orange" }}>{convertISTtoUTCandFormat(data.created_at)}</h3>
          </div>

          <div style={{ backgroundColor: "white", width: "100%", height: "100%", padding: "20px", borderRadius: "15px" }}>


            <div style={styles.convoContainer}>
              <h4 style={{ marginBottom: "45px" }}>CONVERSATION</h4>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ border: "1px solid red", borderRadius: "50%", width: "30px", height: "30px", backgroundColor: "red", display: "flex", justifyContent: "center", alignContent: "center", position: "absolute" }}><p style={{ color: "white", marginTop: "2px" }}>I</p></div>
                <h6 style={{ fontWeight: "bold", marginLeft: "35px" }}>{data.username}</h6>
                <p>updated {calculateDaysAgo(data.updated_at)} days ago</p>
              </div>
              <p style={{ marginTop: "-20px", marginLeft: "35px", fontSize: "smaller" }}>Created {convertISTtoUTCandFormat(data.created_at)}</p>

              <p>{data.description}</p>

              <hr></hr>

              {addComment && addComment.length > 0 && addComment.map((comment) => (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ border: "1px solid red", borderRadius: "50%", width: "30px", height: "30px", backgroundColor: "red", display: "flex", justifyContent: "center", alignContent: "center", position: "absolute" }}><p style={{ color: "white", marginTop: "2px" }}>I</p></div>
                    <h6 style={{ fontWeight: "bold", marginLeft: "35px" }}>{data.username}</h6>
                    <p>updated {calculateDaysAgo(data.created_at)} days ago</p>
                  </div>
                  <p style={{ marginTop: "-20px", marginLeft: "35px", fontSize: "smaller" }}>Created {convertISTtoUTCandFormat(data.created_at)}</p>

                  <p>{comment.text}</p>

                  <hr></hr>
                </>
              ))}


            </div>

            <hr style={{ border: "2px solid black", width: "100%" }}></hr>

            <div style={styles.resolveContainer}>

              <h4 style={{ marginBottom: "20px" }}>RESOLUTION</h4>

              <textarea disabled={data.status === "Completed"} onChange={(e) => setCreateComment(e.target.value)} style={{ width: "100%", borderRadius: "5px", height: "60%" }} placeholder='Please write here...' ></textarea>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button disabled={data.status === "Completed"} onClick={addComments} style={{ backgroundColor: "cornflowerblue", color: "white" } }>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
  mainContainer: {
    width: "100%",
    height: "100vh",
    display: "flex"
  },

  firstCol: {
    backgroundColor: "#e6ebf0",
    height: "100%",
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },

  secondCol: {
    backgroundColor: "#f5f5fa",
    height: "100%",
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },

  thirdCol: {
    backgroundColor: "#f5f5fa",
    height: "100%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "20px 20px 20px 0px"
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    height: '150px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    marginBottom: "15px",
    marginTop: "10px"
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
  bottomRight: {
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  },
  keyCardContainer: {
    position: 'relative',
    width: '80%',
    height: '360px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    marginBottom: "15px",
  },
  pTag: {
    marginBottom: "0px",
    fontSize: "15px"
  },
  bTag: {
    marginBottom: "10px",
    fontSize: "15px"
  },
  orderCardContainer: {
    position: 'relative',
    width: '80%',
    height: '170px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    marginBottom: "15px",
  },
  ticketCardContainer: {
    position: 'relative',
    width: '80%',
    height: '190px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    marginBottom: "15px",
  },
  header: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "30px",
    width: "100%",
    height: "100px"
  },
  convoContainer: {
    width: "100%",
    height: "50%"
  },
  resolveContainer: {
    width: "100%",
    height: "50%"
  }
}

export default Ticket
