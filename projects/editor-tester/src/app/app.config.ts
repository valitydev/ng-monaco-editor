import { ApplicationConfig } from '@angular/core';

import { NgxMonacoEditorConfig } from '../../../editor/src/lib/config';
import { provideMonacoEditor } from '../../../editor/src/lib/editor.module';

declare var monaco: any;

export function onMonacoLoad() {

  console.log((window as any).monaco);

  const uri = monaco.Uri.parse('a://b/foo.json');
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });

}

const monacoConfig: NgxMonacoEditorConfig = {
  // You can pass cdn url here instead
  baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad
};

export const appConfig: ApplicationConfig = {
  providers: [provideMonacoEditor(monacoConfig)]
};
