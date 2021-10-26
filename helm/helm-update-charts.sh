#!/usr/bin/env bash

updateVersions() {
  WEBSITE=$1
  IMAGE_VERSION=$2
  CHART_VERSION=$3

  echo "Image version: ${IMAGE_VERSION}"
  echo "Chart version: ${CHART_VERSION}"

  declare -a charts
  declare -a directories

  charts=( rosetta-website rosetta-website-nginx rosetta-website-node )
  directories=( helm helm helm )

  CHART_COUNT=${#charts[@]}
  for (( i=0; i<CHART_COUNT; i++ ));
  do
    CHART=${charts[$i]}
    DIRECTORY=${directories[$i]}
    echo "chart: $CHART, dir: $DIRECTORY"

    cd "$WEBSITE/$DIRECTORY" || exit
    pwd
    ls -lsa "$CHART"
    sed -i -e "s/version: 0.0.0-master/version: $CHART_VERSION/g" "$CHART"/Chart.yaml
    sed -i -e "s/appVersion: 0.0.0.master/appVersion: $IMAGE_VERSION/g" "$CHART"/Chart.yaml
  done
}

sealRepoSecret() {
  WEBSITE=$1
  SCRIPTS=$2
  CLUSTER=$3
  PROJECT=$4

  declare -a charts

  charts=( rosetta-website-node )
  directories=( helm )

  CHART_COUNT=$(( ${#charts[@]} - 1))
  for i in $(seq 0 "$CHART_COUNT");
  do
    CHART=${charts[$i]}
    DIRECTORY=${directories[$i]}
    echo "chart: $CHART, dir: $DIRECTORY"

    FILE="$WEBSITE"/"$DIRECTORY"/"$CHART"/templates/sealed-secret-"$CLUSTER"-repo.yaml
    echo "{{- if eq \"$CLUSTER\" .Values.global.cluster }}" > "$FILE"
    kubeseal <"$SCRIPTS"/helm/secrets/secret-repo.yaml --controller-name=sealed-secrets --scope cluster-wide -o yaml --name "{{ include \"${CHART}.fullname\" . }}-$CLUSTER-repo" --context "$PROJECT" >> "$FILE"
    echo "{{- end }}" >> "$FILE"
  done
}

sealWebsiteSecret() {
  WEBSITE=$1
  SCRIPTS=$2
  CLUSTER=$3
  PROJECT=$4

  declare -a envs

  envs=( dev prod )

  for j in "${envs[@]}"
    do
      ENV=$j
      echo "env: $ENV"
      FILE="$WEBSITE"/helm/rosetta-website-node/templates/sealed-secret-"$CLUSTER"-"$ENV"-rosetta-website.yaml
      echo "{{- if (and (eq \"$CLUSTER\" .Values.global.cluster) (eq \"$ENV\" .Values.global.env)) }}" > "$FILE"
      kubeseal <"$SCRIPTS"/helm/secrets/secret-"$ENV"-rosetta-website.yaml --controller-name=sealed-secrets --scope cluster-wide -o yaml --name "{{ include \"rosetta-website-node.fullname\" . }}-$CLUSTER-$ENV-rosetta-website" --context "$PROJECT" >> "$FILE"
      echo "{{- end }}" >> "$FILE"
    done

}

sealSecrets() {
  WEBSITE=$1
  SCRIPTS=$2

  declare -a clusters
  declare -a projects

  clusters=( dev prod rc )
  projects=( dev-cluster-1@Development prod-cluster-2@Production "rosetta-cluster@Release Candidate" )

  echo "Chart version: $CHART_VERSION"

  CLUSTER_COUNT=$(( ${#clusters[@]} - 1))
  for i in $(seq 0 "$CLUSTER_COUNT");
  do
    CLUSTER=${clusters[$i]}
    PROJECT=${projects[$i]}
    echo "cluster: $CLUSTER, project: $PROJECT"

    sealRepoSecret "$WEBSITE" "$SCRIPTS" "$CLUSTER" "$PROJECT"
    sealWebsiteSecret "$WEBSITE" "$SCRIPTS" "$CLUSTER" "$PROJECT"
  done
}

ROOT=$1
IMAGE_VERSION=$2
CHART_VERSION=$3
WEBSITE="$ROOT"/rosetta-website
SCRIPTS="$ROOT"/scripts

updateVersions "$WEBSITE" "$IMAGE_VERSION" "$CHART_VERSION"
sealSecrets "$WEBSITE" "$SCRIPTS"