import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

Enzyme.configure({
  adapter: new Adapter(),
});

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.sessionStorage = sessionStorageMock;
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
