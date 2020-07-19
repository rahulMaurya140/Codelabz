import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import StepsPanel from "./StepsPanel";
import { stepsData, tutorialData } from "../../../helpers/dummyData";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../../helpers/CodeBlock";
import { TutorialTimeRemaining } from "../../../helpers/tutorialTime";
import ControlButtons from "./ControlButtons";
import TutorialTitle from "./TutorialTitle";

const { Content, Sider } = Layout;

const ViewTutorial = () => {
  window.scrollTo(0, 0);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPanelVisible, setStepPanelVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  useEffect(() => {
    setStepPanelVisible(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    setTimeRemaining(TutorialTimeRemaining(stepsData, currentStep));
  }, [currentStep]);

  const onChange = (current) => {
    setCurrentStep(current);
    !isDesktop &&
      setTimeout(() => {
        setStepPanelVisible(false);
      }, 300);
  };

  return (
    <Layout className="row-footer-below">
      <Row>
        <Col xs={24} sm={24} md={24}>
          <TutorialTitle
            stepPanelVisible={stepPanelVisible}
            isDesktop={isDesktop}
            setStepPanelVisible={setStepPanelVisible}
            tutorialData={tutorialData}
            timeRemaining={timeRemaining}
          />
        </Col>
      </Row>
      <Layout>
        <Sider
          width={stepPanelVisible ? (isDesktop ? "25%" : "100%") : "0"}
          className={stepPanelVisible ? "col-pad-24-s scrollfix " : ""}
          theme="light"
          style={{ backgroundColor: "white" }}
        >
          <StepsPanel
            currentStep={currentStep}
            onChange={onChange}
            stepsData={stepsData}
            onClick={() => setStepPanelVisible(false)}
            hideButton={isDesktop}
          />
        </Sider>

        <Content style={{ backgroundColor: "#f0f0f0" }}>
          <Row className="tutorial-content" justify="center">
            <Col
              xs={24}
              sm={24}
              md={20}
              lg={18}
              className="col-pad-24-s mt-24-od tutorial-paper"
            >
              {!isDesktop && stepPanelVisible ? null : (
                <ReactMarkdown
                  source={stepsData[currentStep].content}
                  renderers={{ code: CodeBlock }}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} className="col-pad-24-s">
              <ControlButtons
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                stepsData={stepsData}
                hide={!isDesktop && stepPanelVisible}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewTutorial;