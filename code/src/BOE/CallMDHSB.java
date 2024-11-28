package BOE;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class CallMDHSB {
    public static void main(String[] args) {
        try {

            // 定义 action 和 message
            String action = "MES0023";
            String message = "<Request><TradeCode>1012</TradeCode><ExtUserID>wx001</ExtUserID><DepartmentCode></DepartmentCode><StartDate>2024-11-19</StartDate><EndDate>2024-11-19</EndDate><HospitalId>BJMDYY</HospitalId><test>中文</test></Request>";

            // 将 message 转换为字节数组，模拟 RAW 格式
            byte[] actionBytes = action.getBytes("ISO-8859-1"); 
            String decodedaction = new String(actionBytes, "ISO-8859-1");
            byte[] messageBytes = message.getBytes("ISO-8859-1"); 
            String decodedMessage = new String(messageBytes, "ISO-8859-1");


            // 原始字符串
            String data = "_api_access_key=ak&_api_name=service&_api_nonce=2FDC553E-467F-444F-9C35-802FF7936C68&_api_timestamp=1559467961208&_api_version=1.0&action=" + decodedaction + "&message=" + decodedMessage;

            // 密钥
            String secret = "secret";

            // 调用 HMAC-SHA1 加密方法
            String hmacResult = calculateHMACSHA1(data, secret);

            // 输出加密结果
            System.out.println("HMAC-SHA1 Result: " + hmacResult);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 使用 HMAC-SHA1 进行加密
     *
     * @param data   待加密的字符串
     * @param secret 密钥
     * @return 加密后的 Base64 编码字符串
     * @throws Exception 如果加密失败
     */
    public static String calculateHMACSHA1(String data, String secret) throws Exception {
        // 创建 HMAC-SHA1 加密器
        Mac mac = Mac.getInstance("HmacSHA1");

        // 使用密钥初始化加密器
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA1");
        mac.init(secretKeySpec);

        // 执行加密
        byte[] rawHmac = mac.doFinal(data.getBytes("UTF-8"));

        // 将加密结果转换为 Base64 编码
        return Base64.getEncoder().encodeToString(rawHmac);
    }
}
