import React from "react";
import styled from "styled-components";
import Head from "../components/Head";
import Layout from "../components/layout/Layout";
import GameInfo from "../features/gameInfo/GameInfo";
const Detail = () => {
  return (
    <Layout>
      <Head />
      <GameInfo />
    </Layout>
  );
};

export default Detail;
