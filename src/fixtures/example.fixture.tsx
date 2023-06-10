import { ReactFP, FPContainer, FPItem } from "src/index";

export default function App() {
  return (
    <ReactFP>
      <FPContainer>
        <FPItem
          style={{
            backgroundColor: "lime",
            height: "80vh", // defaults to 100vh
            padding: "1em",
          }}
        >
          1
        </FPItem>

        <FPItem
          style={{
            backgroundColor: "coral",
            padding: "1em",
          }}
        >
          2
        </FPItem>

        <FPItem
          style={{
            backgroundColor: "firebrick",
            padding: "1em",
          }}
        >
          3
        </FPItem>
      </FPContainer>
    </ReactFP>
  );
}
