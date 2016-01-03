# run with tree ID:
# example:
# run.sh 6101d4901a5d3006df00001a
rm -rf ./output/
source loadCredentials.sh
# node gingko-to-markdown.js "$1" /output
node gingko-to-markdown.js 6101d4901a5d3006df00001d ./output
