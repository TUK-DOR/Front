// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { beforeUserCreated } = require("firebase-functions/v2/identity");

// 허용된 도메인
const ALLOWED_DOMAINS = ["tukorea.ac.kr"]; // 허용된 도메인 리스트

exports.validateUserDomain = beforeUserCreated((event) => {
  const email = event.data.email;

  // 이메일이 없는 경우 (익명 사용자 등) 바로 차단
  if (!email) {
    logger.warn("사용자 이메일이 없습니다. 익명 사용자일 수 있습니다.");
    throw new Error("이메일이 없는 사용자는 허용되지 않습니다.");
  }

  // 이메일 도메인 추출 (공백 제거 및 소문자 변환)
  const domain = email.split("@")[1].trim().toLowerCase();

  // 디버깅 로그
  logger.info(`사용자 이메일: ${email}`);
  logger.info(`추출된 도메인: ${domain}`);

  // 도메인이 허용된 도메인인지 확인
  if (!ALLOWED_DOMAINS.map(d => d.toLowerCase()).includes(domain)) {
    logger.warn(`허용되지 않은 도메인으로 등록 시도: ${email}`);
    throw new Error(`허용되지 않은 도메인입니다: ${domain}`);
  }

  // 허용된 도메인의 경우
  logger.info(`허용된 도메인의 사용자 등록 진행: ${email}`);
});