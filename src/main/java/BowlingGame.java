public class BowlingGame {

    public int getBowlingScore(String bowlingCode) {
        String[] extractExtraList = bowlingCode.split("\\|\\|");
        String[] frames = extractExtraList[0].split("\\|");
        String extra = extractExtraList.length > 1 ? extractExtraList[1] : "";
        char[] symbol = new char[10];
        int totalScore = 0;

        for (int i = 0; i < frames.length; i++) {
            String frame = frames[i];
            int[] twiceScore = {0,0};

            if (frame.length() == 1) {
                twiceScore[0] = 10;
                symbol[i] = 'X';
            } else {
                char first = frame.charAt(0), second = frame.charAt(1);

                if (first != '-') {
                    twiceScore[0] = first - 48;
                }

                if (second == '/') {
                    twiceScore[1] = 10 - twiceScore[0];
                    symbol[i] = '/';
                } else if (second >= '1' && second <= '9') {
                    twiceScore[1] = second - 48;
                }
            }

            totalScore += twiceScore[0] + twiceScore[1];

            if (i < 1) {
                continue;
            } else if (symbol[i - 1] == '/') {
                totalScore += twiceScore[0];
            } else if (symbol[i - 1] == 'X') {
                totalScore += twiceScore[0] + twiceScore[1];
                if (i > 1 && symbol[i - 2] == 'X') {
                    totalScore += twiceScore[0];
                }
            }
        }

        if (symbol[9] == '/') {
            char extra1 = extra.charAt(0);
            int score = 0;
            if (extra1 >= '1' && extra1 <= '9') {
                score = extra1 - 48;
            } else if (extra1 == 'X') {
                score = 10;
            }
            totalScore += score;
            if (symbol[8] == 'X') {
                totalScore += score;
            }
        } else if (symbol[9] == 'X') {
            for (int i = 0; i < extra.length(); i++) {
                char extrai = extra.charAt(i);
                int score = 0;
                if (extrai >= '1' && extrai <= '9') {
                    score = extrai - 48;
                } else if (extrai == 'X') {
                    score = 10;
                }

                totalScore += score;
                if (i == 0 && symbol[8] == 'X') {
                    totalScore += score;
                }
            }
        }

        return totalScore;
    }

}
