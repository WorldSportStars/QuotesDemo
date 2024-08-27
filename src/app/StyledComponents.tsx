import styled from 'styled-components';

export const fonts = [
  'Arial',
  'Courier New',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Trebuchet MS',
];

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  background: url('/images/2704055.jpg') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  max-width: 1400px;
  margin-bottom: 20px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1400px;
  gap: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 320px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
  }
`;

export const PointsContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ColorPickerPanel = styled(ControlPanel)`
  align-items: center;
`;

export const QuoteContainer = styled.div<{ bgColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || '#030712'};
  border-radius: 10px;
  width: 512px;
  height: 512px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;


export const QuoteText = styled.p<{ fontFamily: string; effect: string; fontColor: string }>`
  font-size: 1.5rem;
  color: ${(props) => props.fontColor || '#ffffff'};
  text-align: center;
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => (props.effect === 'bold' ? 'bold' : 'normal')};
  font-style: ${(props) => (props.effect === 'italic' ? 'italic' : 'normal')};
  text-decoration: ${(props) => (props.effect === 'underline' ? 'underline' : 'none')};
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  white-space: normal;
  line-height: 1.5;
`;


export const CollectButtonContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
  }
`;

export const NavBar = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #0d6efd;
  }
`;
