if test "$#" != 1
then
    echo "Usage $0 <Docker URL>"
    exit 1
fi

DURL=$1
FileCList=/tmp/containers.json
FileStats=/tmp/cont-stats.tmp.json
ADDCOMMA=0
curl -s ${DURL}/containers/json > ${FileCList}

echo "[" > ${FileStats}
for i in `jq  -r ".[] | [.Id, .Names[0]] | @csv" ${FileCList}` 
do
    if test "$ADDCOMMA" = "1" 
    then  
        echo "," >> ${FileStats}
    fi
    ID=`echo $i | cut -d\" -f 2`
    Name=`echo $i | cut -d\" -f 4`
echo $Name
    echo '{' >> ${FileStats}
    echo "\"Id\": \"${ID}\"," >> ${FileStats}
    echo "\"Name\": \"${Name}\"," >> ${FileStats}
    # using sed to remove the first "{" from the stats RestAPI
    curl -s ${DURL}/containers/${ID}/stats?stream=0 | sed "s/^.//" >> ${FileStats}
    ADDCOMMA=1
done

echo "]" >> ${FileStats}

cp ${FileStats} /data/cont-stats.json
