import React, { useState } from 'react'

const DropArea = ({onDrop}) => {
    const [showDrop, setShowDrop] = useState(false);

    return (
        <section
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDrop={() => {
                onDrop();
                setShowDrop(false);
            }}
            onDragOver={(e) => e.preventDefault()}
            style={showDrop ? styles.DropArea : styles.hideDrop}
        >
            Drop Here
        </section>
    )
}

const styles = {
    DropArea:{
        width: "100%",
        height: "100px",
        color: "#dcdcdc",
        border: "1px dashed #dcdcdc",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        opacity: "1",
        transition: "all 0.2s ease-in-out"
    },
    hideDrop:{
        opacity: "0"
    }
}

export default DropArea
