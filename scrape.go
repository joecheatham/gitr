package main 

import {
	"fmt"
	"golang.org/x/net/html"
	"net/http"
	"os"
	"strings"
}



func main() {
	fmt.Println("hello world")

	// Make an http request //
	resp, _ := http.Get(url)
	bytes, _ := ioutil.ReadAll(resp.Body)

	fmt.Println("HTML:\n\n", string(bytes))

	resp.Body.Close()
}