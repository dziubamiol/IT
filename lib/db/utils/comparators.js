function equals(data, compareTo) {
    return data.toString() === compareTo.toString();
}

function contains(data, contains) {
    return data.toString().includes(contains);
}

const COMPARE = {
    cont : contains,
    eql  : equals
};

export default COMPARE;