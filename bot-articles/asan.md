<!-- alias asan -->

# Address Sanitizer

Memory errors are common in C and C++ and can be hard to debug because they often manifest far from their source.

Address sanitizer is a runtime tool that identifies memory errors **at their source** and makes debugging much simpler.
This is an essential tool for C and C++ software development.

Address sanitizer is available for gcc/clang on linux and msvc on windows. To use it, simply pass the flag
`-fsanitize=address` to the compiler.

For a detailed walkthrough, see :tccpp: [Address Sanitizer](http://tccpp.wiki/resources/general/asan)
