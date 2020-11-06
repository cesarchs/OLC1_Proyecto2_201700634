package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("hola mundo")
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.ListenAndServe(":3000", nil)
}
