function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };

  return (
    <button
      className="die"
      style={styles}
      onClick={props.holdDie}
    >
      {props.value}
    </button>
  );
}

export default Die;
