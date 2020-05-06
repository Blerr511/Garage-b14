export const createUrl = _ => {
  try {
    if (_) {
      const url = URL.createObjectURL(_);
      return url;
    } else {
      throw false;
    }
  } catch (Err) {
    return placeholderTestUrl;
  }
};

export const placeholderTestUrl = '/someUrl.png';
