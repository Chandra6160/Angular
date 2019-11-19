var app = angular.module("HangmanApp", [])
app.controller("GameController", ["$scope", '$timeout', function ($scope, $timeout) {
    var words = ["rat", "cat", "pen", "bat", "mat"];
    $scope.incorrected = [];
    $scope.corrected = [];
    $scope.guesses = 6;
    $scope.displayWord = "";
    $scope.input = {
        letter: ""
    }
    const selectRandomWord = () => {
        let index = Math.round(Math.random() * words.length)
        return words[index];
    }
    var newGame = () => {
        $scope.incorrected = [];
        $scope.corrected = [];
        $scope.guesses = 6;
        $scope.displayWord = "";
        selectedWord = selectRandomWord()
        let tempDisplayWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            tempDisplayWord += "#";
        }
        $scope.displayWord = tempDisplayWord

    }

    $scope.letterChosen = () => {
        // console.log($scope.input.letter)
        for (let i = 0; i < $scope.corrected.length; i++) {
            if ($scope.corrected[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.input.letter = ""
                return;
            }
        }
        for (let i = 0; i < $scope.incorrected.length; i++) {
            if ($scope.incorrected[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.input.letter = ""
                return;
            }
        }
        let correct = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i + 1)
                correct = true
            }
        }
        if (correct) {
            $scope.corrected.push($scope.input.letter.toLowerCase())
        }
        else {
            $scope.guesses--
            $scope.incorrected.push($scope.input.letter.toLowerCase())
        }
        $scope.input.letter = ""
        if ($scope.guesses === 0) {
            $timeout(function () {
                newGame()
            }, 500)
        }
        if ($scope.displayWord.indexOf("#") == "-1") {
            $timeout(function () {
                newGame()
            }, 500)
        }
    }
    newGame()
    console.log(selectedWord)


}])