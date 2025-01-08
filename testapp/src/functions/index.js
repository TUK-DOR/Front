const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase Admin 초기화
admin.initializeApp();

// 허용된 이메일 도메인
const ALLOWED_DOMAIN = "@tukora.ac.kr";

// Firebase Authentication 트리거: 사용자 생성 시 실행
exports.validateUserDomain = functions.auth.user().onCreate(async (user) => {
    const email = user.email || "";

    // 이메일 도메인 확인
    if (!email.endsWith(ALLOWED_DOMAIN)) {
        console.log(`허용되지 않은 이메일 도메인: ${email}`);

        // 허용되지 않은 도메인의 사용자를 삭제
        await admin.auth().deleteUser(user.uid);
        console.log(`사용자 ${user.uid}가 삭제되었습니다.`);
    } else {
        console.log(`허용된 이메일 도메인: ${email}`);
    }
});
