import { NextPage } from "next";
//import "./dashboard.scss";
import ReactSlidingPane from "react-sliding-pane";
import { useState } from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";

const Dashboard: NextPage = () => {
  const [state, setState] = useState<any>({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  return (
    <div className="dashboard" style={{ position: "relative" }}>
      Dashboard
      <button onClick={() => setState({ isPaneOpen: !state.isPaneOpen })}>
        Click me to open right pane!
      </button>
      <ReactSlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        from="bottom"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setState({ isPaneOpen: false });
        }}
      >
        <div style={{ background: "yellow" }}>
          And I am pane content. BTW, what rocks?
        </div>
        <br />
        <div style={{ height: "30px", width: "30px", background: "black" }} />
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid inventore quod
        quasi officiis iusto repellendus? Fugiat sequi ipsa, neque maiores laborum nihil
        cupiditate iste quam, enim sit voluptas quis, perferendis odio perspiciatis earum
        porro accusamus consequuntur? Reiciendis sapiente deleniti deserunt id ab enim
        cupiditate aliquam et eos temporibus quibusdam, distinctio maiores assumenda,
        numquam molestiae consequuntur quis! Consequatur neque eum id quisquam corrupti
        dolorem odio nesciunt molestias, ex unde ipsam consectetur ipsa laudantium ullam
        quis veritatis maiores magni officia sequi in blanditiis velit distinctio! Dicta
        ratione sapiente officia porro perferendis, saepe, ea sint assumenda explicabo non
        cupiditate eius, rerum fuga earum.
      </ReactSlidingPane>
    </div>
  );
};

export default Dashboard;
