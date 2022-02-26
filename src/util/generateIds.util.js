const generateIds = () => {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
};

const getId = generateIds();

export default getId;
