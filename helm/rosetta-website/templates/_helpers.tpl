{{/*
Expand the name of the chart.
*/}}
{{- define "rosetta-website.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "rosetta-website.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "rosetta-website.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "rosetta-website.labels" -}}
helm.sh/chart: {{ include "rosetta-website.chart" . }}
{{ include "rosetta-website.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "rosetta-website.selectorLabels" -}}
app.kubernetes.io/name: {{ include "rosetta-website.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "rosetta-website.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "rosetta-website.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "rosetta-website.imagePullSecret" -}}
{{- printf "%s-%s-repo" (include "rosetta-website.fullname" . ) .Values.global.cluster }}
{{- end }}

{{- define "rosetta-website.hostPrefix" -}}
{{- if .Values.global.hostnameOverride }}
{{- printf "%s" .Values.global.hostnameOverride }}
{{- else }}
{{- printf "%s.%s" .Release.Namespace .Values.global.cluster }}
{{- end }}
{{- end }}

{{- define "rosetta-website.hostname" -}}
{{- printf "%s.%s" (include "rosetta-website.hostPrefix" . ) .Values.global.hostSuffix }}
{{- end }}
